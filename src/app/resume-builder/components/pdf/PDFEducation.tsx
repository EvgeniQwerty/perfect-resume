import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "../../types";
import { getPdfTranslation } from "./pdfTranslations";

interface PDFEducationProps {
  data: ResumeData['education'];
  dateFormat?: string;
  language?: 'en' | 'ru';
}

// PDF styles
const styles = StyleSheet.create({
  section: {
    marginBottom: 10,
  },
  subheader: {
    fontSize: 14,
    fontFamily: "Roboto",
    fontWeight: "bold",
    marginBottom: 6,
    paddingBottom: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  text: {
    fontSize: 10,
    fontFamily: "Roboto",
    marginBottom: 2,
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
});

export const PDFEducation = ({ data, dateFormat = "YYYY-MM-DD", language = 'en' }: PDFEducationProps) => {
  // Helper function to format dates based on the selected format
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    
    const [year, month, day] = dateString.split("-");
    
    // Month names for localization
    const monthNamesShort = {
      en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      ru: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"]
    };
    
    const monthNamesFull = {
      en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      ru: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
    };
    
    switch (dateFormat) {
      case "MM/DD/YYYY":
        return `${month}/${day}/${year}`;
      case "DD/MM/YYYY":
        return `${day}/${month}/${year}`;
      case "DD.MM.YYYY":
        return `${day}.${month}.${year}`;
      case "MMM DD, YYYY":
        return `${monthNamesShort[language][parseInt(month) - 1]} ${day}, ${year}`;
      case "MMMM YYYY":
        return `${monthNamesFull[language][parseInt(month) - 1]} ${year}`;
      default: // YYYY-MM-DD
        return dateString;
    }
  };
  
  return (
  <View style={styles.section}>
    <Text style={styles.subheader}>{getPdfTranslation('education.title', language).toUpperCase()}</Text>
    {data.map((edu, index) => (
      <View key={index} style={styles.section}>
        <View style={styles.row}>
          <Text style={[styles.text, styles.bold]}>{edu.universityName}</Text>
          <Text style={styles.text}>{edu.location}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.text, styles.italic]}>{edu.degree}{edu.gpa ? `, ${getPdfTranslation('education.gpa', language)}: ${edu.gpa}` : ""}</Text>
          <Text style={styles.text}>{formatDate(edu.graduationDate)}</Text>
        </View>
      </View>
    ))}
  </View>
);
};