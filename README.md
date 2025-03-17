# Perfect Resume

Perfect Resume is a modern, feature-rich resume builder application that helps you create professional, Harvard-style resumes in minutes. Stand out from the competition with clean formatting and AI-powered suggestions.

## Features

### Easy-to-Use Interface
- Step-by-step resume building process with intuitive navigation
- Drag-and-drop functionality for reordering work experience and education entries
- Live preview of your resume as you build it

### Multi-Language Support
- Full support for English and Russian languages
- Seamlessly switch between languages while building your resume
- All UI elements, form fields, and generated content adapt to your selected language

### AI-Powered Enhancements
- Generate skills based on your work experience
- Transform basic job responsibilities into impactful, achievement-oriented statements
- AI suggestions help highlight your accomplishments and quantify results

### Customizable Date Formats
- Choose from multiple date format options (YYYY-MM-DD, MM/DD/YYYY, etc.)
- Consistent date formatting throughout your resume

### ATS-Friendly Design
- Optimized to pass Applicant Tracking Systems
- Clean, professional formatting that hiring managers love
- Harvard-style resume layout that stands out

### PDF Export
- Download your completed resume as a professionally formatted PDF
- Ready to send to employers

### Data Persistence
- Your resume data is automatically saved in your browser
- Continue where you left off when you return

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/evgeniqwerty/perfect-resume.git
   cd perfect-resume
   ```

2. Install dependencies
   ```
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with your OpenRouter API key
   ```
   OPENROUTER_API_KEY=your_api_key_here
   ```
   You can obtain an API key by registering at [https://openrouter.ai/](https://openrouter.ai/)

4. Start the development server
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Personal Information**: Fill in your basic contact details
2. **Work Experience**: Add your professional history with AI-enhanced responsibilities
3. **Education**: Include your academic background
4. **Skills**: Add skills manually or generate them with AI based on your work experience
5. **Preview & Download**: Review your resume and download it as a PDF

## Building for Production

```
npm run build
npm start
# or
yarn build
yarn start
```

## Technologies Used

- Next.js - React framework
- TypeScript - Type-safe JavaScript
- Tailwind CSS - Utility-first CSS framework
- Formik - Form management
- Yup - Form validation
- React-PDF - PDF generation
- React DnD - Drag and drop functionality

## Acknowledgments

- Inspired by Harvard resume formatting guidelines
- AI-powered features utilize modern language models
