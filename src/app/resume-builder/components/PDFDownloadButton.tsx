'use client';

import { useState, useEffect } from 'react';
import { pdf } from '@react-pdf/renderer';
import ResumePDF from './ResumePDF';
import { ResumeData } from '../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { Font } from '@react-pdf/renderer';

// Pre-register fonts to ensure they're available before PDF generation
const preRegisterFonts = () => {
  if (typeof window === 'undefined') return false; // Skip on server-side
  
  try {
    // Register Roboto font using local font files from public/font directory
    Font.register({
      family: "Roboto",
      fonts: [
        { src: "/font/Roboto-Regular.ttf" },
        { src: "/font/Roboto-Bold.ttf", fontWeight: "bold" },
        { src: "/font/Roboto-Italic.ttf", fontStyle: "italic" },
        { src: "/font/Roboto-BoldItalic.ttf", fontWeight: "bold", fontStyle: "italic" },
      ],
    });
    
    // Register Times as a fallback font
    Font.register({
      family: "Times",
      fonts: [
        { src: "Times-Roman" },
        { src: "Times-Bold", fontWeight: "bold" },
      ],
    });
    
    // Register hyphenation callback for better text wrapping
    Font.registerHyphenationCallback(word => [word]);
    
    console.log('Fonts pre-registered successfully');
    return true;
  } catch (error) {
    console.error('Error pre-registering fonts:', error);
    // Fallback to standard PDF fonts if registration fails
    try {
      Font.register({ family: 'Roboto', src: 'Helvetica' });
      Font.register({ family: 'Times', src: 'Times-Roman' });
      console.log('Fallback fonts registered');
      return true;
    } catch (fallbackError) {
      console.error('Fallback font registration failed:', fallbackError);
      return false;
    }
  }
};

interface PDFDownloadButtonProps {
  data: ResumeData;
  dateFormat: string;
}

const PDFDownloadButton = ({ data, dateFormat }: PDFDownloadButtonProps) => {
  const [isClient, setIsClient] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { t } = useLanguage();

  // Only render on client-side and pre-load fonts
  useEffect(() => {
    setIsClient(true);
    const loadFonts = async () => {
      const result = preRegisterFonts();
      setFontsLoaded(result);
    };
    loadFonts();
  }, []);

  const handleDownload = async () => {
    try {
      // Reset error state
      setError(null);
      setIsGenerating(true);
      
      console.log('Starting PDF generation with data:', data);
      
      // Ensure fonts are registered before proceeding
      if (!fontsLoaded) {
        const fontResult = preRegisterFonts();
        if (!fontResult) {
          throw new Error('Failed to register required fonts for PDF generation');
        }
      }
      
      // Create the PDF document instance
      const pdfDocument = <ResumePDF data={data} dateFormat={dateFormat} />;
      
      // Use a try-catch block specifically for the PDF generation
      try {
        // Generate PDF with increased buffer size to handle larger documents
        const blob = await pdf(pdfDocument).toBlob();
        
        console.log('PDF blob generated successfully');
        
        // Create a URL for the blob
        const url = URL.createObjectURL(blob);
        
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = url;
        link.download = 'resume.pdf';
        
        console.log('Triggering download...');
        
        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the URL object
        URL.revokeObjectURL(url);
        
        console.log('Download process completed');
      } catch (pdfError) {
        console.error('PDF generation error:', pdfError);
        throw new Error(
          pdfError instanceof Error 
            ? `PDF generation failed: ${pdfError.message}` 
            : 'PDF generation failed with unknown error'
        );
      }
      
      setIsGenerating(false);
    } catch (error) {
      console.error('Error in download process:', error);
      setError(
        error instanceof Error 
          ? error.message 
          : 'Unknown error occurred while generating the PDF'
      );
      setIsGenerating(false);
    }
  };

  if (!isClient) {
    return (
      <button 
        type="button"
        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        disabled
      >
        {t('preview.preparingPDF')}
      </button>
    );
  }

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={handleDownload}
        disabled={isGenerating}
        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        {isGenerating 
          ? t('preview.preparingPDF') 
          : t('preview.downloadPDF')}
      </button>
      {error && (
        <p className="text-red-500 text-sm mt-2">
          Error: {error}
        </p>
      )}
    </div>
  );
};

export default PDFDownloadButton;