import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "../../types";
import { getPdfTranslation } from "./pdfTranslations";

interface PDFSkillsProps {
  data: ResumeData['skills'];
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
  text: {
    fontSize: 10,
    fontFamily: "Roboto",
    marginBottom: 2,
  },
});

export const PDFSkills = ({ data, language = 'en' }: PDFSkillsProps) => {
  return (
  <View style={styles.section}>
    <Text style={styles.subheader}>{getPdfTranslation('skills.title', language).toUpperCase()}</Text>
    <Text style={styles.text}>{data.join(", ")}</Text>
  </View>
  );
};