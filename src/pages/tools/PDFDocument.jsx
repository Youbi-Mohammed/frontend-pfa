// import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer';

// const styles = StyleSheet.create({
//   body: { padding: 20, fontSize: 12 },
//   title: { fontSize: 16, marginBottom: 10, fontWeight: 'bold' }
// });

// export default function PDFDocument({ markdown }) {
//   // Simple conversion texte -> PDF (à améliorer)
//   return (
//     <Document>
//       <Page style={styles.body}>
//         <Text style={styles.title}>Cahier des Charges</Text>
//         <Text>{markdown.replace(/#+\s/g, '').replace(/-/g, '•')}</Text>
//       </Page>
//     </Document>
//   );
// }
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Enregistrer une police (optionnel)
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf' }, // regular
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc9.ttf', fontWeight: 'bold' }
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Roboto'
  },
  header: {
    marginBottom: 20,
    borderBottom: '1px solid #eee',
    paddingBottom: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5
  },
  section: {
    marginBottom: 15
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333'
  },
  text: {
    fontSize: 12,
    lineHeight: 1.5,
    marginBottom: 5
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 5
  },
  bulletPoint: {
    width: 10,
    fontSize: 12,
    paddingRight: 5
  },
  listText: {
    fontSize: 12,
    flex: 1
  }
});

const PDFDocument = ({ content }) => {
  // Fonction pour parser le Markdown en éléments PDF
  const parseMarkdown = (text) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      if (line.startsWith('# ')) {
        return <Text key={i} style={styles.title}>{line.replace('# ', '')}</Text>;
      } else if (line.startsWith('## ')) {
        return <Text key={i} style={styles.sectionTitle}>{line.replace('## ', '')}</Text>;
      } else if (line.startsWith('- ')) {
        return (
          <View key={i} style={styles.listItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.listText}>{line.replace('- ', '')}</Text>
          </View>
        );
      } else {
        return <Text key={i} style={styles.text}>{line}</Text>;
      }
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Cahier des Charges</Text>
          <Text style={styles.text}>Généré le {new Date().toLocaleDateString()}</Text>
        </View>
        
        <View style={styles.section}>
          {parseMarkdown(content)}
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;