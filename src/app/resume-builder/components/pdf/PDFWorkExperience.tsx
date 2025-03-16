import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "../../types";
import { getPdfTranslation } from "./pdfTranslations";

interface PDFWorkExperienceProps {
  data: ResumeData['workExperience'];
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
  bullet: {
    marginLeft: 10,
  },
});

export const PDFWorkExperience = ({ data, dateFormat = "YYYY-MM-DD", language = 'en' }: PDFWorkExperienceProps) => {
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
    <Text style={styles.subheader}>{getPdfTranslation('workExperience.title', language).toUpperCase()}</Text>
    {data.map((job, index) => (
      <View key={index} style={styles.section}>
        <View style={styles.row}>
          <Text style={[styles.text, styles.bold]}>{job.companyName}</Text>
          {job.location && <Text style={styles.text}>{job.location}</Text>}
        </View>
        <View style={styles.row}>
          <Text style={[styles.text, styles.italic]}>{job.jobTitle}</Text>
          <Text style={styles.text}>
            {formatDate(job.startDate)} - {job.isCurrentJob ? getPdfTranslation('workExperience.currentJob', language) : formatDate(job.endDate)}
          </Text>
        </View>
        {job.responsibilities.map((resp, idx) => (
          <Text key={idx} style={[styles.text, styles.bullet]}>• {resp}</Text>
        ))}
      </View>
    ))}
  </View>
);
};