import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "../../types";

interface PDFHeaderProps {
  data: ResumeData['personalInfo'];
}

// PDF styles
const styles = StyleSheet.create({
  section: {
    marginBottom: 14,
  },
  header: {
    fontSize: 18,
    fontFamily: "Roboto",
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  contactInfo: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 12,
    fontFamily: "Roboto",
  },
});

export const PDFHeader = ({ data }: PDFHeaderProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.header}>{data.fullName}</Text>
      {data.location && <Text style={styles.contactInfo}>{data.location}</Text>}
      <Text style={styles.contactInfo}>
        {data.email}
        {data.linkedin && ` | ${data.linkedin}`}
        {data.phone && ` | ${data.phone}`}
        {data.telegram && ` | ${data.telegram}`}
      </Text>
    </View>
  );
};