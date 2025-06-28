// // import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer';

// // const styles = StyleSheet.create({
// //   body: { padding: 20, fontSize: 12 },
// //   title: { fontSize: 16, marginBottom: 10, fontWeight: 'bold' }
// // });

// // export default function PDFDocument({ markdown }) {
// //   // Simple conversion texte -> PDF (à améliorer)
// //   return (
// //     <Document>
// //       <Page style={styles.body}>
// //         <Text style={styles.title}>Cahier des Charges</Text>
// //         <Text>{markdown.replace(/#+\s/g, '').replace(/-/g, '•')}</Text>
// //       </Page>
// //     </Document>
// //   );
// // }
// import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// // Enregistrer une police (optionnel)
// Font.register({
//   family: 'Roboto',
//   fonts: [
//     { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf' }, // regular
//     { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc9.ttf', fontWeight: 'bold' }
//   ]
// });

// const styles = StyleSheet.create({
//   page: {
//     padding: 40,
//     fontFamily: 'Roboto'
//   },
//   header: {
//     marginBottom: 20,
//     borderBottom: '1px solid #eee',
//     paddingBottom: 10
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 5
//   },
//   section: {
//     marginBottom: 15
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#333'
//   },
//   text: {
//     fontSize: 12,
//     lineHeight: 1.5,
//     marginBottom: 5
//   },
//   listItem: {
//     flexDirection: 'row',
//     marginBottom: 5
//   },
//   bulletPoint: {
//     width: 10,
//     fontSize: 12,
//     paddingRight: 5
//   },
//   listText: {
//     fontSize: 12,
//     flex: 1
//   }
// });

// const PDFDocument = ({ content }) => {
//   // Fonction pour parser le Markdown en éléments PDF
//   const parseMarkdown = (text) => {
//     const lines = text.split('\n');
//     return lines.map((line, i) => {
//       if (line.startsWith('# ')) {
//         return <Text key={i} style={styles.title}>{line.replace('# ', '')}</Text>;
//       } else if (line.startsWith('## ')) {
//         return <Text key={i} style={styles.sectionTitle}>{line.replace('## ', '')}</Text>;
//       } else if (line.startsWith('- ')) {
//         return (
//           <View key={i} style={styles.listItem}>
//             <Text style={styles.bulletPoint}>•</Text>
//             <Text style={styles.listText}>{line.replace('- ', '')}</Text>
//           </View>
//         );
//       } else {
//         return <Text key={i} style={styles.text}>{line}</Text>;
//       }
//     });
//   };

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.header}>
//           <Text style={styles.title}>Cahier des Charges</Text>
//           <Text style={styles.text}>Généré le {new Date().toLocaleDateString()}</Text>
//         </View>
        
//         <View style={styles.section}>
//           {parseMarkdown(content)}
//         </View>
//       </Page>
//     </Document>
//   );
// };

// export default PDFDocument;
// import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// // Enregistrement des polices
// Font.register({
//   family: 'Roboto',
//   fonts: [
//     { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf' }, // regular
//     { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc9.ttf', fontWeight: 'bold' } // bold
//   ]
// });

// // Styles améliorés
// const styles = StyleSheet.create({
//   page: {
//     padding: 40,
//     fontFamily: 'Roboto',
//     lineHeight: 1.5
//   },
//   header: {
//     marginBottom: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eaecef',
//     borderBottomStyle: 'solid',
//     paddingBottom: 10
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     color: '#24292e'
//   },
//   date: {
//     fontSize: 12,
//     color: '#586069'
//   },
//   toc: {
//     marginBottom: 20,
//     backgroundColor: '#f6f8fa',
//     padding: 15,
//     borderRadius: 3
//   },
//   tocItem: {
//     marginBottom: 5,
//     fontSize: 12
//   },
//   section: {
//     marginBottom: 15
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#24292e',
//     borderBottomWidth: 1,
//     borderBottomColor: '#eaecef',
//     borderBottomStyle: 'solid',
//     paddingBottom: 5
//   },
//   subsectionTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#0366d6'
//   },
//   text: {
//     fontSize: 12,
//     marginBottom: 8,
//     color: '#24292e'
//   },
//   listItem: {
//     flexDirection: 'row',
//     marginBottom: 5
//   },
//   bulletPoint: {
//     width: 15,
//     fontSize: 12,
//     paddingRight: 5
//   },
//   listText: {
//     fontSize: 12,
//     flex: 1
//   },
//   highlight: {
//     fontWeight: 'bold',
//     color: '#0366d6'
//   }
// });

// const PDFDocument = ({ content }) => {
//   // Fonction pour parser le contenu Markdown
//   const renderContent = () => {
//     const sections = content.split('\n## ');
//     return sections.map((section, i) => {
//       const [title, ...body] = section.split('\n');
//       const bodyText = body.join('\n');

//       if (i === 0 && title.startsWith('1. ')) {
//         return (
//           <View key={i} style={styles.section}>
//             <Text style={styles.sectionTitle}>{title.replace('1. ', '')}</Text>
//             {renderBody(bodyText)}
//           </View>
//         );
//       }

//       if (title.startsWith('2. ') || title.startsWith('3. ') || title.startsWith('4. ') || title.startsWith('5. ')) {
//         return (
//           <View key={i} style={styles.section}>
//             <Text style={styles.sectionTitle}>{title}</Text>
//             {renderBody(bodyText)}
//           </View>
//         );
//       }

//       return renderBody(section);
//     });
//   };

//   const renderBody = (text) => {
//     const lines = text.split('\n');
//     return lines.map((line, i) => {
//       if (line.startsWith('### ')) {
//         return (
//           <Text key={i} style={styles.subsectionTitle}>
//             {line.replace('### ', '')}
//           </Text>
//         );
//       }

//       if (line.startsWith('- **')) {
//         const parts = line.split('**');
//         return (
//           <View key={i} style={styles.listItem}>
//             <Text style={styles.bulletPoint}>•</Text>
//             <Text style={styles.listText}>
//               {parts.map((part, j) => 
//                 j % 2 === 1 ? (
//                   <Text key={j} style={styles.highlight}>
//                     {part}
//                   </Text>
//                 ) : (
//                   part
//                 )
//               )}
//             </Text>
//           </View>
//         );
//       }

//       if (line.startsWith('- ')) {
//         return (
//           <View key={i} style={styles.listItem}>
//             <Text style={styles.bulletPoint}>•</Text>
//             <Text style={styles.listText}>{line.replace('- ', '')}</Text>
//           </View>
//         );
//       }

//       return (
//         <Text key={i} style={styles.text}>
//           {line}
//         </Text>
//       );
//     });
//   };

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.header}>
//           <Text style={styles.title}>Cahier des Charges</Text>
//           <Text style={styles.date}>Généré le {new Date().toLocaleDateString()}</Text>
//         </View>

//         <View style={styles.toc}>
//           <Text style={[styles.text, { fontWeight: 'bold' }]}>Table des Matières</Text>
//           {content.includes('1. Introduction') && (
//             <Text style={styles.tocItem}>1. Introduction</Text>
//           )}
//           {content.includes('2. Exigences Fonctionnelles') && (
//             <Text style={styles.tocItem}>2. Exigences Fonctionnelles</Text>
//           )}
//           {content.includes('3. Exigences Techniques') && (
//             <Text style={styles.tocItem}>3. Exigences Techniques</Text>
//           )}
//           {content.includes('4. Livrables') && (
//             <Text style={styles.tocItem}>4. Livrables</Text>
//           )}
//           {content.includes('5. Planning') && (
//             <Text style={styles.tocItem}>5. Planning</Text>
//           )}
//         </View>

//         {renderContent()}
//       </Page>
//     </Document>
//   );
// };

// export default PDFDocument;
//mna lt7t woooooow 
// import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// // Polices avec fallback
// Font.register({
//   family: 'Roboto',
//   fonts: [
//     { 
//       src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf',
//       fontWeight: 'normal'
//     },
//     {
//       src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc9.ttf',
//       fontWeight: 'bold'
//     }
//   ]
// });

// // Styles améliorés avec gestion des erreurs
// const styles = StyleSheet.create({
//   page: {
//     padding: 40,
//     fontFamily: 'Roboto',
//     lineHeight: 1.5
//   },
//   header: {
//     marginBottom: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//     paddingBottom: 10
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#2c3e50',
//     marginBottom: 5
//   },
//   section: {
//     marginBottom: 15,
//     paddingLeft: 10
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#34495e',
//     marginBottom: 8,
//     borderLeftWidth: 3,
//     borderLeftColor: '#3498db',
//     paddingLeft: 10
//   },
//   subsection: {
//     marginBottom: 10,
//     paddingLeft: 15
//   },
//   subsectionTitle: {
//     fontSize: 14,
//     fontWeight: 'semibold',
//     color: '#2980b9',
//     marginBottom: 5
//   },
//   text: {
//     fontSize: 12,
//     color: '#34495e',
//     marginBottom: 6
//   },
//   listItem: {
//     flexDirection: 'row',
//     marginBottom: 5
//   },
//   bulletPoint: {
//     width: 20,
//     fontSize: 14,
//     color: '#7f8c8d'
//   },
//   listText: {
//     fontSize: 12,
//     flex: 1,
//     color: '#34495e'
//   },
//   highlight: {
//     fontWeight: 'bold',
//     color: '#e74c3c'
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#ecf0f1',
//     marginVertical: 15
//   }
// });

// const parseContent = (content) => {
//   if (!content || typeof content !== 'string') {
//     return [];
//   }

//   try {
//     return content.split('\n').filter(line => line.trim() !== '');
//   } catch (error) {
//     console.error('Error parsing content:', error);
//     return [];
//   }
// };

// const PDFDocument = ({ content }) => {
//   const lines = parseContent(content);
//   let currentSection = null;
//   let currentSubsection = null;

//   const renderContent = () => {
//     const elements = [];
//     let keyIndex = 0;

//     for (let i = 0; i < lines.length; i++) {
//       const line = lines[i].trim();

//       if (line.startsWith('# ')) {
//         currentSection = line.replace('#', '').trim();
//         elements.push(
//           <View key={`section-${keyIndex++}`} style={styles.header}>
//             <Text style={styles.title}>{currentSection}</Text>
//           </View>
//         );
//         continue;
//       }

//       if (line.startsWith('## ')) {
//         currentSection = line.replace('##', '').trim();
//         elements.push(
//           <View key={`section-${keyIndex++}`} style={styles.section}>
//             <Text style={styles.sectionTitle}>{currentSection}</Text>
//           </View>
//         );
//         continue;
//       }

//       if (line.startsWith('### ')) {
//         currentSubsection = line.replace('###', '').trim();
//         elements.push(
//           <View key={`subsection-${keyIndex++}`} style={styles.subsection}>
//             <Text style={styles.subsectionTitle}>{currentSubsection}</Text>
//           </View>
//         );
//         continue;
//       }

//       if (line.startsWith('- ')) {
//         const text = line.replace('-', '').trim();
//         elements.push(
//           <View key={`item-${keyIndex++}`} style={styles.listItem}>
//             <Text style={styles.bulletPoint}>•</Text>
//             <Text style={styles.listText}>{text}</Text>
//           </View>
//         );
//         continue;
//       }

//       if (line.includes('**')) {
//         const parts = line.split('**');
//         const textElements = parts.map((part, index) => 
//           index % 2 === 1 ? (
//             <Text key={index} style={styles.highlight}>
//               {part}
//             </Text>
//           ) : (
//             part
//           )
//         );
        
//         elements.push(
//           <Text key={`text-${keyIndex++}`} style={styles.text}>
//             {textElements}
//           </Text>
//         );
//         continue;
//       }

//       if (line.trim() !== '') {
//         elements.push(
//           <Text key={`text-${keyIndex++}`} style={styles.text}>
//             {line}
//           </Text>
//         );
//       }
//     }

//     return elements;
//   };

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.header}>
//           <Text style={styles.title}>Cahier des Charges</Text>
//           <Text style={styles.text}>Généré le {new Date().toLocaleDateString('fr-FR')}</Text>
//         </View>

//         {renderContent()}
//       </Page>
//     </Document>
//   );
// };

// export default PDFDocument;

////lfou9 wooooow

// import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// // Configuration des polices
// Font.register({
//   family: 'Roboto',
//   fonts: [
//     { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf' },
//     { 
//       src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc9.ttf',
//       fontWeight: 'bold' 
//     }
//   ]
// });

// // Styles optimisés
// const styles = StyleSheet.create({
//   page: {
//     padding: 40,
//     fontFamily: 'Roboto',
//     lineHeight: 1.5
//   },
//   header: {
//     marginBottom: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//     paddingBottom: 10
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#2c3e50'
//   },
//   toc: {
//     marginBottom: 25,
//     backgroundColor: '#f8f9fa',
//     padding: 15,
//     borderRadius: 5,
//     borderLeftWidth: 4,
//     borderLeftColor: '#4285f4'
//   },
//   tocTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#4285f4'
//   },
//   tocItem: {
//     flexDirection: 'row',
//     marginBottom: 5,
//     alignItems: 'center'
//   },
//   tocBullet: {
//     width: 20,
//     fontSize: 14,
//     color: '#4285f4'
//   },
//   tocText: {
//     fontSize: 12,
//     color: '#2c3e50'
//   },
//   section: {
//     marginBottom: 20
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#4285f4',
//     marginBottom: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//     paddingBottom: 5
//   },
//   boldText: {
//     fontWeight: 'bold',
//     color: '#d44638'
//   },
//   normalText: {
//     fontSize: 12,
//     color: '#4a4a4a',
//     marginBottom: 8
//   },
//   listItem: {
//     flexDirection: 'row',
//     marginBottom: 6
//   },
//   bullet: {
//     width: 20,
//     fontSize: 14
//   },
//   listText: {
//     fontSize: 12,
//     flex: 1
//   },
//   highlightBox: {
//     backgroundColor: '#f8f9fa',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 15,
//     borderLeftWidth: 3,
//     borderLeftColor: '#4285f4'
//   }
// });

// const PDFDocument = ({ content }) => {
//   // Fonction pour extraire la table des matières
//   const renderTOC = () => {
//     const sections = [];
//     const lines = content.split('\n');

//     lines.forEach(line => {
//       if (line.startsWith('## ')) {
//         const title = line.replace('##', '').trim();
//         sections.push(title);
//       }
//     });

//     return (
//       <View style={styles.toc}>
//         <Text style={styles.tocTitle}>Table des Matières</Text>
//         {sections.map((section, index) => (
//           <View key={`toc-${index}`} style={styles.tocItem}>
//             <Text style={styles.tocBullet}>•</Text>
//             <Text style={styles.tocText}>{section}</Text>
//           </View>
//         ))}
//       </View>
//     );
//   };

//   // Fonction pour rendre le contenu principal
//   const renderContent = () => {
//     return content.split('\n').map((line, index) => {
//       if (line.startsWith('# ')) {
//         return (
//           <View key={`title-${index}`} style={styles.header}>
//             <Text style={styles.title}>{line.replace('#', '').trim()}</Text>
//           </View>
//         );
//       }

//       if (line.startsWith('## ')) {
//         return (
//           <View key={`section-${index}`} style={styles.section}>
//             <Text style={styles.sectionTitle}>{line.replace('##', '').trim()}</Text>
//           </View>
//         );
//       }

//       if (line.includes('**')) {
//         const parts = line.split('**');
//         return (
//           <Text key={`bold-${index}`} style={styles.normalText}>
//             {parts.map((part, i) => 
//               i % 2 === 1 ? (
//                 <Text key={i} style={styles.boldText}>
//                   {part}
//                 </Text>
//               ) : (
//                 part
//               )
//             )}
//           </Text>
//         );
//       }

//       if (line.startsWith('- ')) {
//         return (
//           <View key={`list-${index}`} style={styles.listItem}>
//             <Text style={styles.bullet}>•</Text>
//             <Text style={styles.listText}>{line.replace('-', '').trim()}</Text>
//           </View>
//         );
//       }

//       if (line.trim() !== '') {
//         return (
//           <Text key={`text-${index}`} style={styles.normalText}>
//             {line}
//           </Text>
//         );
//       }

//       return null;
//     });
//   };

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         {renderTOC()}
//         {renderContent()}
//       </Page>
//     </Document>
//   );
// };

// export default PDFDocument;
//t7T mzian
// import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// // Configuration des polices
// Font.register({
//   family: 'Roboto',
//   fonts: [
//     { 
//       src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf',
//       fontWeight: 'normal'
//     },
//     {
//       src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc9.ttf',
//       fontWeight: 'bold'
//     }
//   ]
// });

// // Styles optimisés
// const styles = StyleSheet.create({
//   page: {
//     padding: 40,
//     fontFamily: 'Roboto',
//     lineHeight: 1.5
//   },
//   header: {
//     marginBottom: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//     paddingBottom: 10
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#2c3e50',
//     marginBottom: 5
//   },
//   section: {
//     marginBottom: 15,
//     paddingLeft: 10
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#34495e',
//     marginBottom: 8,
//     borderLeftWidth: 3,
//     borderLeftColor: '#3498db',
//     paddingLeft: 10
//   },
//   boldText: {
//     fontWeight: 'bold',
//     color: '#2c3e50',
//     backgroundColor: '#f8f9fa',
//     paddingHorizontal: 4,
//     borderRadius: 3
//   },
//   normalText: {
//     fontSize: 12,
//     color: '#4a4a4a',
//     marginBottom: 8
//   },
//   listItem: {
//     flexDirection: 'row',
//     marginBottom: 6
//   },
//   bullet: {
//     width: 20,
//     fontSize: 14,
//     color: '#3498db'
//   },
//   listText: {
//     fontSize: 12,
//     flex: 1
//   },
//   highlightBox: {
//     backgroundColor: '#f8f9fa',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 15,
//     borderLeftWidth: 3,
//     borderLeftColor: '#3498db'
//   }
// });

// const PDFDocument = ({ content }) => {
//   // Fonction pour traiter les éléments en gras
//   const renderBoldText = (text) => {
//     const parts = text.split('**');
//     return parts.map((part, index) => 
//       index % 2 === 1 ? (
//         <Text key={index} style={styles.boldText}>
//           {part}
//         </Text>
//       ) : (
//         part
//       )
//     );
//   };

//   // Fonction pour rendre le contenu principal
//   const renderContent = () => {
//     return content.split('\n').map((line, index) => {
//       if (line.startsWith('# ')) {
//         return (
//           <View key={`title-${index}`} style={styles.header}>
//             <Text style={styles.title}>{line.replace('#', '').trim()}</Text>
//           </View>
//         );
//       }

//       if (line.startsWith('## ')) {
//         return (
//           <View key={`section-${index}`} style={styles.section}>
//             <Text style={styles.sectionTitle}>{line.replace('##', '').trim()}</Text>
//           </View>
//         );
//       }

//       if (line.includes('**')) {
//         return (
//           <Text key={`bold-${index}`} style={styles.normalText}>
//             {renderBoldText(line)}
//           </Text>
//         );
//       }

//       if (line.startsWith('- ')) {
//         return (
//           <View key={`list-${index}`} style={styles.listItem}>
//             <Text style={styles.bullet}>•</Text>
//             <Text style={styles.listText}>{line.replace('-', '').trim()}</Text>
//           </View>
//         );
//       }

//       if (line.trim() !== '') {
//         return (
//           <Text key={`text-${index}`} style={styles.normalText}>
//             {line}
//           </Text>
//         );
//       }

//       return null;
//     });
//   };

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.header}>
//           <Text style={styles.title}>Cahier des Charges</Text>
//           <Text style={styles.normalText}>Généré le {new Date().toLocaleDateString('fr-FR')}</Text>
//         </View>

//         {renderContent()}
//       </Page>
//     </Document>
//   );
// };

// export default PDFDocument;

//fou9 mzian
// import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// // Configuration des polices
// Font.register({
//   family: 'Roboto',
//   fonts: [
//     { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf' },
//     { 
//       src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc9.ttf',
//       fontWeight: 'bold' 
//     }
//   ]
// });

// // Styles optimisés
// const styles = StyleSheet.create({
//   page: {
//     padding: 40,
//     fontFamily: 'Roboto',
//     lineHeight: 1.5
//   },
//   header: {
//     marginBottom: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//     paddingBottom: 10
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#2c3e50'
//   },
//   section: {
//     marginBottom: 15
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#4285f4',
//     marginBottom: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//     paddingBottom: 5
//   },
//   subsectionTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#34a853',
//     marginBottom: 8,
//     marginTop: 12
//   },
//   boldText: {
//     fontWeight: 'bold',
//     color: '#d44638',
//     backgroundColor: '#f8f9fa',
//     paddingHorizontal: 2
//   },
//   normalText: {
//     fontSize: 12,
//     color: '#4a4a4a',
//     marginBottom: 8
//   },
//   listItem: {
//     flexDirection: 'row',
//     marginBottom: 6
//   },
//   bullet: {
//     width: 20,
//     fontSize: 14,
//     color: '#4285f4'
//   },
//   listText: {
//     fontSize: 12,
//     flex: 1
//   }
// });

// const PDFDocument = ({ content }) => {
//   // Fonction pour traiter les éléments en gras
//   const renderBoldText = (text) => {
//     const parts = text.split('**');
//     return parts.map((part, index) => 
//       index % 2 === 1 ? (
//         <Text key={index} style={styles.boldText}>
//           {part}
//         </Text>
//       ) : (
//         part
//       )
//     );
//   };

//   // Fonction principale de rendu
//   const renderContent = () => {
//     const lines = content.split('\n');
//     const elements = [];
//     let currentList = null;

//     for (let i = 0; i < lines.length; i++) {
//       const line = lines[i].trim();

//       if (line.startsWith('# ')) {
//         elements.push(
//           <View key={`title-${i}`} style={styles.header}>
//             <Text style={styles.title}>{line.replace('#', '').trim()}</Text>
//           </View>
//         );
//         continue;
//       }

//       if (line.startsWith('## ')) {
//         elements.push(
//           <View key={`section-${i}`} style={styles.section}>
//             <Text style={styles.sectionTitle}>{line.replace('##', '').trim()}</Text>
//           </View>
//         );
//         continue;
//       }

//       if (line.startsWith('### ')) {
//         elements.push(
//           <Text key={`subsection-${i}`} style={styles.subsectionTitle}>
//             {line.replace('###', '').trim()}
//           </Text>
//         );
//         continue;
//       }

//       if (line.startsWith('- ')) {
//         if (!currentList) {
//           currentList = [];
//         }
//         currentList.push(
//           <View key={`item-${i}`} style={styles.listItem}>
//             <Text style={styles.bullet}>•</Text>
//             <Text style={styles.listText}>
//               {renderBoldText(line.replace('-', '').trim())}
//             </Text>
//           </View>
//         );
//         continue;
//       }

//       if (currentList && currentList.length > 0) {
//         elements.push(...currentList);
//         currentList = null;
//       }

//       if (line.includes('**')) {
//         elements.push(
//           <Text key={`text-${i}`} style={styles.normalText}>
//             {renderBoldText(line)}
//           </Text>
//         );
//         continue;
//       }

//       if (line.trim() !== '') {
//         elements.push(
//           <Text key={`text-${i}`} style={styles.normalText}>
//             {line}
//           </Text>
//         );
//       }
//     }

//     if (currentList && currentList.length > 0) {
//       elements.push(...currentList);
//     }

//     return elements;
//   };

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.header}>
//           <Text style={styles.title}>Cahier des Charges</Text>
//           <Text style={styles.normalText}>Généré le {new Date().toLocaleDateString('fr-FR')}</Text>
//         </View>

//         {renderContent()}
//       </Page>
//     </Document>
//   );
// };

// export default PDFDocument;
///T7T ktr mn wow 
// import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// // Configuration des polices
// Font.register({
//   family: 'Roboto',
//   fonts: [
//     { 
//       src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf',
//       fontWeight: 'normal'
//     },
//     {
//       src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc9.ttf',
//       fontWeight: 'bold'
//     }
//   ]
// });

// // Styles optimisés
// const styles = StyleSheet.create({
//   page: {
//     padding: 40,
//     fontFamily: 'Roboto',
//     lineHeight: 1.5
//   },
//   header: {
//     marginBottom: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//     paddingBottom: 10
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#2c3e50',
//     marginBottom: 5
//   },
//   section: {
//     marginBottom: 15,
//     paddingLeft: 10
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#34495e',
//     marginBottom: 8,
//     borderLeftWidth: 3,
//     borderLeftColor: '#3498db',
//     paddingLeft: 10
//   },
//   subsection: {
//     marginBottom: 10,
//     paddingLeft: 15
//   },
//   subsectionTitle: {
//     fontSize: 14,
//     fontWeight: 'semibold',
//     color: '#2980b9',
//     marginBottom: 5
//   },
//   text: {
//     fontSize: 12,
//     color: '#34495e',
//     marginBottom: 6
//   },
//   boldText: {
//     fontWeight: 'bold',
//     color: '#e74c3c',
//     backgroundColor: '#f8f9fa',
//     paddingHorizontal: 2,
//     borderRadius: 2
//   },
//   listItem: {
//     flexDirection: 'row',
//     marginBottom: 5
//   },
//   bulletPoint: {
//     width: 20,
//     fontSize: 14,
//     color: '#7f8c8d'
//   },
//   listText: {
//     fontSize: 12,
//     flex: 1,
//     color: '#34495e'
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#ecf0f1',
//     marginVertical: 15
//   }
// });

// const parseContent = (content) => {
//   if (!content || typeof content !== 'string') {
//     return [];
//   }

//   try {
//     return content.split('\n').filter(line => line.trim() !== '');
//   } catch (error) {
//     console.error('Error parsing content:', error);
//     return [];
//   }
// };

// const PDFDocument = ({ content }) => {
//   const lines = parseContent(content);
//   let currentSection = null;
//   let currentSubsection = null;

//   // Fonction pour traiter les éléments en gras
//   const renderBoldText = (text) => {
//     const parts = text.split('**');
//     return parts.map((part, index) => 
//       index % 2 === 1 ? (
//         <Text key={index} style={styles.boldText}>
//           {part}
//         </Text>
//       ) : (
//         part
//       )
//     );
//   };

//   const renderContent = () => {
//     const elements = [];
//     let keyIndex = 0;

//     for (let i = 0; i < lines.length; i++) {
//       const line = lines[i].trim();

//       if (line.startsWith('# ')) {
//         currentSection = line.replace('#', '').trim();
//         elements.push(
//           <View key={`header-${keyIndex++}`} style={styles.header}>
//             <Text style={styles.title}>{currentSection}</Text>
//           </View>
//         );
//         continue;
//       }

//       if (line.startsWith('## ')) {
//         currentSection = line.replace('##', '').trim();
//         elements.push(
//           <View key={`section-${keyIndex++}`} style={styles.section}>
//             <Text style={styles.sectionTitle}>{currentSection}</Text>
//           </View>
//         );
//         continue;
//       }

//       if (line.startsWith('### ')) {
//         currentSubsection = line.replace('###', '').trim();
//         elements.push(
//           <View key={`subsection-${keyIndex++}`} style={styles.subsection}>
//             <Text style={styles.subsectionTitle}>{currentSubsection}</Text>
//           </View>
//         );
//         continue;
//       }

//       if (line.startsWith('- ')) {
//         const text = line.replace('-', '').trim();
//         elements.push(
//           <View key={`item-${keyIndex++}`} style={styles.listItem}>
//             <Text style={styles.bulletPoint}>•</Text>
//             <Text style={styles.listText}>
//               {renderBoldText(text)}
//             </Text>
//           </View>
//         );
//         continue;
//       }

//       if (line.includes('**')) {
//         elements.push(
//           <Text key={`text-${keyIndex++}`} style={styles.text}>
//             {renderBoldText(line)}
//           </Text>
//         );
//         continue;
//       }

//       if (line.trim() !== '') {
//         elements.push(
//           <Text key={`text-${keyIndex++}`} style={styles.text}>
//             {line}
//           </Text>
//         );
//       }
//     }

//     return elements;
//   };

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.header}>
//           <Text style={styles.title}>Cahier des Charges</Text>
//           <Text style={styles.text}>Généré le {new Date().toLocaleDateString('fr-FR')}</Text>
//         </View>

//         {renderContent()}
//       </Page>
//     </Document>
//   );
// };


// export default PDFDocument;

// fou9 ktr mn wow 

// import { Page, Text, View, Document, StyleSheet, Font, Link } from '@react-pdf/renderer';

// // Configuration des polices
// Font.register({
//   family: 'Roboto',
//   fonts: [
//     { 
//       src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf',
//       fontWeight: 'normal'
//     },
//     {
//       src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc9.ttf',
//       fontWeight: 'bold'
//     }
//   ]
// });

// // Styles optimisés
// const styles = StyleSheet.create({
//   page: {
//     padding: 40,
//     fontFamily: 'Roboto',
//     lineHeight: 1.5
//   },
//   header: {
//     marginBottom: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//     paddingBottom: 10
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#2c3e50',
//     marginBottom: 5
//   },
//   tocContainer: {
//     marginBottom: 25,
//     backgroundColor: '#f8f9fa',
//     padding: 15,
//     borderRadius: 5,
//     borderLeftWidth: 4,
//     borderLeftColor: '#3498db'
//   },
//   tocTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#2c3e50'
//   },
//   tocItem: {
//     flexDirection: 'row',
//     marginBottom: 5,
//     alignItems: 'center'
//   },
//   tocBullet: {
//     width: 20,
//     fontSize: 14,
//     color: '#3498db'
//   },
//   tocText: {
//     fontSize: 12,
//     color: '#2c3e50',
//     textDecoration: 'none'
//   },
//   section: {
//     marginBottom: 15,
//     paddingLeft: 10
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#34495e',
//     marginBottom: 8,
//     borderLeftWidth: 3,
//     borderLeftColor: '#3498db',
//     paddingLeft: 10
//   },
//   subsection: {
//     marginBottom: 10,
//     paddingLeft: 15
//   },
//   subsectionTitle: {
//     fontSize: 14,
//     fontWeight: 'semibold',
//     color: '#2980b9',
//     marginBottom: 5
//   },
//   text: {
//     fontSize: 12,
//     color: '#34495e',
//     marginBottom: 6
//   },
//   boldText: {
//     fontWeight: 'bold',
//     color: '#e74c3c',
//     backgroundColor: '#f8f9fa',
//     paddingHorizontal: 2,
//     borderRadius: 2
//   },
//   listItem: {
//     flexDirection: 'row',
//     marginBottom: 5
//   },
//   bulletPoint: {
//     width: 20,
//     fontSize: 14,
//     color: '#7f8c8d'
//   },
//   listText: {
//     fontSize: 12,
//     flex: 1,
//     color: '#34495e'
//   }
// });

// const parseContent = (content) => {
//   if (!content || typeof content !== 'string') {
//     return [];
//   }

//   try {
//     return content.split('\n').filter(line => line.trim() !== '');
//   } catch (error) {
//     console.error('Error parsing content:', error);
//     return [];
//   }
// };

// const PDFDocument = ({ content }) => {
//   const lines = parseContent(content);

//   // Fonction pour extraire la table des matières
//   const renderTOC = () => {
//     const sections = [];
//     const lines = content.split('\n');

//     lines.forEach(line => {
//       if (line.startsWith('## ')) {
//         const title = line.replace('##', '').trim();
//         sections.push(title);
//       }
//     });

//     return (
//       <View style={styles.tocContainer}>
//         <Text style={styles.tocTitle}>Table des Matières</Text>
//         {sections.map((section, index) => (
//           <View key={`toc-item-${index}`} style={styles.tocItem}>
//             <Text style={styles.tocBullet}>•</Text>
//             <Link src={`#section-${index}`} style={styles.tocText}>
//               {section}
//             </Link>
//           </View>
//         ))}
//       </View>
//     );
//   };

//   // Fonction pour traiter les éléments en gras
//   const renderBoldText = (text) => {
//     const parts = text.split('**');
//     return parts.map((part, index) => 
//       index % 2 === 1 ? (
//         <Text key={index} style={styles.boldText}>
//           {part}
//         </Text>
//       ) : (
//         part
//       )
//     );
//   };

//   const renderContent = () => {
//     const elements = [];
//     let sectionIndex = 0;

//     for (let i = 0; i < lines.length; i++) {
//       const line = lines[i].trim();

//       if (line.startsWith('# ')) {
//         elements.push(
//           <View key={`header-${i}`} style={styles.header}>
//             <Text style={styles.title}>{line.replace('#', '').trim()}</Text>
//           </View>
//         );
//         continue;
//       }

//       if (line.startsWith('## ')) {
//         elements.push(
//           <View key={`section-${sectionIndex}`} style={styles.section} id={`section-${sectionIndex}`}>
//             <Text style={styles.sectionTitle}>{line.replace('##', '').trim()}</Text>
//           </View>
//         );
//         sectionIndex++;
//         continue;
//       }

//       if (line.startsWith('### ')) {
//         elements.push(
//           <View key={`subsection-${i}`} style={styles.subsection}>
//             <Text style={styles.subsectionTitle}>{line.replace('###', '').trim()}</Text>
//           </View>
//         );
//         continue;
//       }

//       if (line.startsWith('- ')) {
//         const text = line.replace('-', '').trim();
//         elements.push(
//           <View key={`item-${i}`} style={styles.listItem}>
//             <Text style={styles.bulletPoint}>•</Text>
//             <Text style={styles.listText}>
//               {renderBoldText(text)}
//             </Text>
//           </View>
//         );
//         continue;
//       }

//       if (line.includes('**')) {
//         elements.push(
//           <Text key={`text-${i}`} style={styles.text}>
//             {renderBoldText(line)}
//           </Text>
//         );
//         continue;
//       }

//       if (line.trim() !== '') {
//         elements.push(
//           <Text key={`text-${i}`} style={styles.text}>
//             {line}
//           </Text>
//         );
//       }
//     }

//     return elements;
//   };

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.header}>
//           <Text style={styles.title}>Cahier des Charges</Text>
//           <Text style={styles.text}>Généré le {new Date().toLocaleDateString('fr-FR')}</Text>
//         </View>

//         {renderTOC()}
//         {renderContent()}
//       </Page>
//     </Document>
//   );
// };

// export default PDFDocument;
// import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// // Configuration des polices
// Font.register({
//   family: 'Roboto',
//   fonts: [
//     { 
//       src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf',
//       fontWeight: 'normal'
//     },
//     {
//       src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc9.ttf',
//       fontWeight: 'bold'
//     }
//   ]
// });

// // Styles
// const styles = StyleSheet.create({
//   page: {
//     padding: 40,
//     fontFamily: 'Roboto',
//     lineHeight: 1.5
//   },
//   header: {
//     marginBottom: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//     paddingBottom: 10
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#2c3e50',
//     marginBottom: 5
//   },
//   tocContainer: {
//     marginBottom: 25,
//     backgroundColor: '#f8f9fa',
//     padding: 15,
//     borderRadius: 5,
//     borderLeftWidth: 4,
//     borderLeftColor: '#3498db'
//   },
//   tocTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#2c3e50'
//   },
//   tocItem: {
//     flexDirection: 'row',
//     marginBottom: 5,
//     alignItems: 'center'
//   },
//   tocBullet: {
//     width: 20,
//     fontSize: 14,
//     color: '#3498db'
//   },
//   tocText: {
//     fontSize: 12,
//     color: '#2c3e50'
//   },
//   section: {
//     marginBottom: 15,
//     paddingLeft: 10
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#34495e',
//     marginBottom: 8,
//     borderLeftWidth: 3,
//     borderLeftColor: '#3498db',
//     paddingLeft: 10
//   },
//   subsection: {
//     marginBottom: 10,
//     paddingLeft: 15
//   },
//   subsectionTitle: {
//     fontSize: 14,
//     fontWeight: 'semibold',
//     color: '#2980b9',
//     marginBottom: 5
//   },
//   text: {
//     fontSize: 12,
//     color: '#34495e',
//     marginBottom: 6
//   },
//   boldText: {
//     fontWeight: 'bold',
//     color: '#e74c3c'
//   },
//   listItem: {
//     flexDirection: 'row',
//     marginBottom: 5
//   },
//   bulletPoint: {
//     width: 20,
//     fontSize: 14,
//     color: '#7f8c8d'
//   },
//   listText: {
//     fontSize: 12,
//     flex: 1,
//     color: '#34495e'
//   },
//   linkText: {
//     color: '#2980b9',
//     textDecoration: 'none'
//   }
// });

// // Fonction pour nettoyer le texte
// const cleanText = (text) => {
//   if (!text) return '';
  
//   // Supprime les liens Markdown [texte](#lien)
//   let cleaned = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  
//   // Supprime les liens autonomes [x](#Y)
//   cleaned = cleaned.replace(/^\[([^\]]+)\]\(#[^)]+\)/g, '').trim();
  
//   return cleaned;
// };

// const parseContent = (content) => {
//   if (!content || typeof content !== 'string') return [];
  
//   try {
//     return content.split('\n')
//       .map(line => cleanText(line))
//       .filter(line => line.trim() !== '');
//   } catch (error) {
//     console.error('Error parsing content:', error);
//     return [];
//   }
// };

// const PDFDocument = ({ content }) => {
//   const lines = parseContent(content);

//   // Génère la table des matières
//   const getTOCSections = () => {
//     return lines
//       .filter(line => line.startsWith('## '))
//       .map(line => line.replace('##', '').trim());
//   };

//   const tocSections = getTOCSections();

//   // Traite le texte en gras
//   const renderBoldText = (text) => {
//     const parts = text.split('**');
//     return parts.map((part, index) => 
//       index % 2 === 1 ? (
//         <Text key={index} style={styles.boldText}>
//           {part}
//         </Text>
//       ) : (
//         part
//       )
//     );
//   };

//   // Rend le contenu principal
//   const renderContent = () => {
//     const elements = [];
//     let sectionIndex = 0;

//     lines.forEach((line, i) => {
//       if (line.startsWith('# ')) {
//         elements.push(
//           <View key={`header-${i}`} style={styles.header}>
//             <Text style={styles.title}>{line.replace('#', '').trim()}</Text>
//           </View>
//         );
//         return;
//       }

//       if (line.startsWith('## ')) {
//         elements.push(
//           <View key={`section-${sectionIndex}`} style={styles.section}>
//             <Text style={styles.sectionTitle}>{line.replace('##', '').trim()}</Text>
//           </View>
//         );
//         sectionIndex++;
//         return;
//       }

//       if (line.startsWith('### ')) {
//         elements.push(
//           <View key={`subsection-${i}`} style={styles.subsection}>
//             <Text style={styles.subsectionTitle}>{line.replace('###', '').trim()}</Text>
//           </View>
//         );
//         return;
//       }

//       if (line.startsWith('- ')) {
//         const text = line.replace('-', '').trim();
//         elements.push(
//           <View key={`item-${i}`} style={styles.listItem}>
//             <Text style={styles.bulletPoint}>•</Text>
//             <Text style={styles.listText}>
//               {renderBoldText(text)}
//             </Text>
//           </View>
//         );
//         return;
//       }

//       if (line.includes('**')) {
//         elements.push(
//           <Text key={`text-${i}`} style={styles.text}>
//             {renderBoldText(line)}
//           </Text>
//         );
//         return;
//       }

//       elements.push(
//         <Text key={`text-${i}`} style={styles.text}>
//           {line}
//         </Text>
//       );
//     });

//     return elements;
//   };

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.header}>
//           <Text style={styles.title}>Cahier des Charges</Text>
//           <Text style={styles.text}>Généré le {new Date().toLocaleDateString('fr-FR')}</Text>
//         </View>

//         {tocSections.length > 0 && (
//           <View style={styles.tocContainer}>
//             <Text style={styles.tocTitle}>Table des Matières</Text>
//             {tocSections.map((section, index) => (
//               <View key={`toc-${index}`} style={styles.tocItem}>
//                 <Text style={styles.tocBullet}>•</Text>
//                 <Text style={styles.tocText}>{section}</Text>
//               </View>
//             ))}
//           </View>
//         )}

//         {renderContent()}
//       </Page>
//     </Document>
//   );
// };

// export default PDFDocument;
// import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// // Configuration des polices
// Font.register({
//   family: 'Roboto',
//   fonts: [
//     { 
//       src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf',
//       fontWeight: 'normal'
//     },
//     {
//       src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc9.ttf',
//       fontWeight: 'bold'
//     }
//   ]
// });

// // Styles
// const styles = StyleSheet.create({
//   page: {
//     padding: 40,
//     fontFamily: 'Roboto',
//     lineHeight: 1.5
//   },
//   header: {
//     marginBottom: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//     paddingBottom: 10
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#2c3e50',
//     marginBottom: 5
//   },
//   tocContainer: {
//     marginBottom: 25,
//     backgroundColor: '#f8f9fa',
//     padding: 15,
//     borderRadius: 5,
//     borderLeftWidth: 4,
//     borderLeftColor: '#3498db'
//   },
//   tocTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#2c3e50'
//   },
//   tocItem: {
//     flexDirection: 'row',
//     marginBottom: 5,
//     alignItems: 'center'
//   },
//   tocBullet: {
//     width: 20,
//     fontSize: 14,
//     color: '#3498db'
//   },
//   tocText: {
//     fontSize: 12,
//     color: '#2c3e50'
//   },
//   section: {
//     marginBottom: 15,
//     paddingLeft: 10
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#34495e',
//     marginBottom: 8,
//     borderLeftWidth: 3,
//     borderLeftColor: '#3498db',
//     paddingLeft: 10
//   },
//   subsection: {
//     marginBottom: 10,
//     paddingLeft: 15
//   },
//   subsectionTitle: {
//     fontSize: 14,
//     fontWeight: 'semibold',
//     color: '#2980b9',
//     marginBottom: 5
//   },
//   text: {
//     fontSize: 12,
//     color: '#34495e',
//     marginBottom: 6
//   },
//   boldText: {
//     fontWeight: 'bold',
//     color: '#e74c3c'
//   },
//   listItem: {
//     flexDirection: 'row',
//     marginBottom: 5
//   },
//   bulletPoint: {
//     width: 20,
//     fontSize: 14,
//     color: '#7f8c8d'
//   },
//   listText: {
//     fontSize: 12,
//     flex: 1,
//     color: '#34495e'
//   }
// });

// // Fonction pour nettoyer le texte
// const cleanText = (text) => {
//   if (!text) return '';
//   return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim();
// };

// const parseContent = (content) => {
//   if (!content || typeof content !== 'string') return [];
  
//   try {
//     return content.split('\n')
//       .map(line => cleanText(line))
//       .filter(line => line.trim() !== '');
//   } catch (error) {
//     console.error('Error parsing content:', error);
//     return [];
//   }
// };

// const PDFDocument = ({ content }) => {
//   const lines = parseContent(content);

//   // Génère la table des matières uniquement à partir des titres de section
//   const tocSections = lines
//     .filter(line => line.startsWith('## '))
//     .map(line => line.replace('##', '').trim());

//   // Traite le texte en gras
//   const renderBoldText = (text) => {
//     const parts = text.split('**');
//     return parts.map((part, index) => 
//       index % 2 === 1 ? (
//         <Text key={index} style={styles.boldText}>
//           {part}
//         </Text>
//       ) : (
//         part
//       )
//     );
//   };

//   // Rend le contenu principal
//   const renderContent = () => {
//     const elements = [];
//     let sectionIndex = 0;

//     lines.forEach((line, i) => {
//       if (line.startsWith('# ')) {
//         elements.push(
//           <View key={`header-${i}`} style={styles.header}>
//             <Text style={styles.title}>{line.replace('#', '').trim()}</Text>
//           </View>
//         );
//         return;
//       }

//       if (line.startsWith('## ')) {
//         elements.push(
//           <View key={`section-${sectionIndex}`} style={styles.section}>
//             <Text style={styles.sectionTitle}>{line.replace('##', '').trim()}</Text>
//           </View>
//         );
//         sectionIndex++;
//         return;
//       }

//       if (line.startsWith('### ')) {
//         elements.push(
//           <View key={`subsection-${i}`} style={styles.subsection}>
//             <Text style={styles.subsectionTitle}>{line.replace('###', '').trim()}</Text>
//           </View>
//         );
//         return;
//       }

//       if (line.startsWith('- ')) {
//         const text = line.replace('-', '').trim();
//         elements.push(
//           <View key={`item-${i}`} style={styles.listItem}>
//             <Text style={styles.bulletPoint}>•</Text>
//             <Text style={styles.listText}>
//               {renderBoldText(text)}
//             </Text>
//           </View>
//         );
//         return;
//       }

//       if (line.includes('**')) {
//         elements.push(
//           <Text key={`text-${i}`} style={styles.text}>
//             {renderBoldText(line)}
//           </Text>
//         );
//         return;
//       }

//       elements.push(
//         <Text key={`text-${i}`} style={styles.text}>
//           {line}
//         </Text>
//       );
//     });

//     return elements;
//   };

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.header}>
//           <Text style={styles.title}>Cahier des Charges</Text>
//           <Text style={styles.text}>Généré le {new Date().toLocaleDateString('fr-FR')}</Text>
//         </View>

//         {/* Table des matières unique */}
//         {tocSections.length > 0 && (
//           <View style={styles.tocContainer}>
//             <Text style={styles.tocTitle}>Table des Matières</Text>
//             {tocSections.map((section, index) => (
//               <View key={`toc-${index}`} style={styles.tocItem}>
//                 <Text style={styles.tocBullet}>•</Text>
//                 <Text style={styles.tocText}>{section}</Text>
//               </View>
//             ))}
//           </View>
//         )}

//         {renderContent()}
//       </Page>
//     </Document>
//   );
// };

// export default PDFDocument;
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Configuration des polices
Font.register({
  family: 'Roboto',
  fonts: [
    { 
      src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf',
      fontWeight: 'normal'
    },
    {
      src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc9.ttf',
      fontWeight: 'bold'
    }
  ]
});

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Roboto',
    lineHeight: 1.5
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 10
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5
  },
  tocContainer: {
    marginBottom: 25,
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db'
  },
  tocTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50'
  },
  tocItem: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center'
  },
  tocBullet: {
    width: 20,
    fontSize: 14,
    color: '#3498db'
  },
  tocText: {
    fontSize: 12,
    color: '#2c3e50'
  },
  section: {
    marginBottom: 15,
    paddingLeft: 10
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#3498db',
    paddingLeft: 10
  },
  subsection: {
    marginBottom: 10,
    paddingLeft: 15
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: 'semibold',
    color: '#2980b9',
    marginBottom: 5
  },
  text: {
    fontSize: 12,
    color: '#34495e',
    marginBottom: 6
  },
  boldText: {
    fontWeight: 'bold',
    color: '#e74c3c'
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 5
  },
  bulletPoint: {
    width: 20,
    fontSize: 14,
    color: '#7f8c8d'
  },
  listText: {
    fontSize: 12,
    flex: 1,
    color: '#34495e'
  },
  linkText: {
    color: '#2980b9',
    textDecoration: 'none'
  }
});

// Fonction pour nettoyer le texte
const cleanText = (text) => {
  if (!text) return '';
  
  // Supprime les liens Markdown [texte](#lien)
  let cleaned = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  
  // Supprime les liens autonomes [x](#Y)
  cleaned = cleaned.replace(/^\[([^\]]+)\]\(#[^)]+\)/g, '').trim();
  
  return cleaned;
};

const parseContent = (content) => {
  if (!content || typeof content !== 'string') return [];
  
  try {
    return content.split('\n')
      .map(line => cleanText(line))
      .filter(line => line.trim() !== '');
  } catch (error) {
    console.error('Error parsing content:', error);
    return [];
  }
};

const PDFDocument = ({ content }) => {
  const lines = parseContent(content);

  // Génère la table des matières
  const getTOCSections = () => {
    return lines
      .filter(line => line.startsWith('## '))
      .map(line => line.replace('##', '').trim());
  };

  const tocSections = getTOCSections();

  // Traite le texte en gras
  const renderBoldText = (text) => {
    const parts = text.split('**');
    return parts.map((part, index) => 
      index % 2 === 1 ? (
        <Text key={index} style={styles.boldText}>
          {part}
        </Text>
      ) : (
        part
      )
    );
  };

  // Rend le contenu principal
  const renderContent = () => {
    const elements = [];
    let sectionIndex = 0;

    lines.forEach((line, i) => {
      if (line.startsWith('# ')) {
        elements.push(
          <View key={`header-${i}`} style={styles.header}>
            <Text style={styles.title}>{line.replace('#', '').trim()}</Text>
          </View>
        );
        return;
      }

      if (line.startsWith('## ')) {
        elements.push(
          <View key={`section-${sectionIndex}`} style={styles.section}>
            <Text style={styles.sectionTitle}>{line.replace('##', '').trim()}</Text>
          </View>
        );
        sectionIndex++;
        return;
      }

      if (line.startsWith('### ')) {
        elements.push(
          <View key={`subsection-${i}`} style={styles.subsection}>
            <Text style={styles.subsectionTitle}>{line.replace('###', '').trim()}</Text>
          </View>
        );
        return;
      }

      if (line.startsWith('- ')) {
        const text = line.replace('-', '').trim();
        elements.push(
          <View key={`item-${i}`} style={styles.listItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.listText}>
              {renderBoldText(text)}
            </Text>
          </View>
        );
        return;
      }

      if (line.includes('**')) {
        elements.push(
          <Text key={`text-${i}`} style={styles.text}>
            {renderBoldText(line)}
          </Text>
        );
        return;
      }

      elements.push(
        <Text key={`text-${i}`} style={styles.text}>
          {line}
        </Text>
      );
    });

    return elements;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* bien ca  */}
        {/* <View style={styles.header}>
          <Text style={styles.title}>Cahier des Charges</Text>
          <Text style={styles.text}>Généré le {new Date().toLocaleDateString('fr-FR')}</Text>
        </View> */}

        {tocSections.length > 0 && (
          <View style={styles.tocContainer}>
            {/* ou ca  */}
            <Text style={styles.title}>Cahier des Charges</Text>
          <Text style={styles.text}>Généré le {new Date().toLocaleDateString('fr-FR')}</Text>
            {/* <Text style={styles.tocTitle}>Table des Matières</Text> */}
            {/* {tocSections.map((section, index) => (
              <View key={`toc-${index}`} style={styles.tocItem}>
                <Text style={styles.tocBullet}>•</Text>
                <Text style={styles.tocText}>{section}</Text>
              </View>
            ))} */}
          </View>
        )}

        {renderContent()}
      </Page>
    </Document>
  );
//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.header}>
//           <Text style={styles.title}>Cahier des Charges</Text>
//           <Text style={styles.text}>Généré le {new Date().toLocaleDateString('fr-FR')}</Text>
//         </View>

//         {renderContent()}
//       </Page>
//     </Document>
//   );
};

export default PDFDocument;

//fou9 kttttttttttr mn wow