import React, { useState } from 'react';
import './DiagramPage.css';

function DiagramPage() {
    // States for each structured section
    const [systemName, setSystemName] = useState('');
    const [entities, setEntities] = useState([
        { name: '', attributes: '', methods: '' }
    ]);
    const [relationships, setRelationships] = useState('');
    const [requirements, setRequirements] = useState('');
    
    const [umlDiagramSvg, setUmlDiagramSvg] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    

    
    const addEntity = () => {
        setEntities([...entities, { name: '', attributes: '', methods: '' }]);
    };

    const updateEntity = (index, field, value) => {
        const newEntities = [...entities];
        newEntities[index][field] = value;
        setEntities(newEntities);
    };

   
    const formatStructuredDataToText = () => {
        let text = `System Name: ${systemName}\n\n`;
        
        text += "Entities:\n";
        entities.forEach((entity, index) => {
            text += `${index + 1}. ${entity.name}:\n`;
            text += `   Attributes: ${entity.attributes}\n`;
            if (entity.methods && entity.methods.trim() !== '') {
                text += `   Methods: ${entity.methods}\n`;
            }
        });
        
        text += "\nRelationships:\n";
        text += relationships;
        
        text += "\n\nKey Functionalities:\n";
        text += requirements;
        
        return text;
    };

   
    const validateForm = () => {
        if (!systemName.trim()) {
            return "System name is required";
        }
        
        for (const entity of entities) {
            if (!entity.name.trim()) return "Entity name is required for all entries";
            if (!entity.attributes.trim()) return "Attributes are required for all entities";
        }
        
        if (!requirements.trim()) {
            return "Key functionalities are required";
        }
        
        return null;
    };
    const downloadSvg = () => {
        if (!umlDiagramSvg) return;
        
        const blob = new Blob([umlDiagramSvg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `${systemName.replace(/\s+/g, '_')}_diagram.svg`;
        document.body.appendChild(a);
        a.click();
        
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };


    const generateDiagram = async () => {
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        setError(null);
        setUmlDiagramSvg('');

        try {
           
            const textExplanation = formatStructuredDataToText();
            
           
            const response = await fetch(
                'http://localhost:8080/api/v1/diagrams/generate-from-text', 
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text: textExplanation })
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to generate diagram');
            }

            const data = await response.json();
            if (data.plantUmlCode) {
                setUmlDiagramSvg(data.plantUmlCode);
            } else {
                setError('No diagram received from server');
            }

        } catch (err) {
            setError(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="diagram-container">
            <h1>UML Diagram Generator</h1>
            
            <div className="form-section">
                <h2>1. System Overview</h2>
                <label>
                    What is your system called? *
                    <input
                        type="text"
                        value={systemName}
                        onChange={(e) => setSystemName(e.target.value)}
                        placeholder="Example: Library Management System"
                        required
                    />
                </label>
            </div>

          
            <div className="form-section">
                <h2>2. Main Entities *</h2>
                <p className="hint">
                    What are the key objects/concepts in your system?
                    (Example: Book, User, Order)
                </p>
                
                {entities.map((entity, index) => (
                    <div key={index} className="entity-card">
                        <label>
                            Entity Name *
                            <input
                                type="text"
                                value={entity.name}
                                onChange={(e) => updateEntity(index, 'name', e.target.value)}
                                placeholder="Example: Book"
                                required
                            />
                        </label>
                        
                        <label>
                            Characteristics (Attributes) *
                            <textarea
                                value={entity.attributes}
                                onChange={(e) => updateEntity(index, 'attributes', e.target.value)}
                                placeholder="Example: title: String, author: String, ISBN: String"
                                rows="2"
                                required
                            />
                        </label>
                        
                        <label>
                            Possible Actions (Methods)
                            <textarea
                                value={entity.methods}
                                onChange={(e) => updateEntity(index, 'methods', e.target.value)}
                                placeholder="Example: borrow(), return()"
                                rows="2"
                            />
                        </label>
                    </div>
                ))}
                
                <button 
                    type="button" 
                    onClick={addEntity}
                    className="add-button"
                >
                    + Add Entity
                </button>
            </div>

            <div className="form-section">
                <h2>3. Entity Relationships</h2>
                <p className="hint">
                    How do your entities interact with each other?
                    (Example: "A User can borrow multiple Books")
                </p>
                <textarea
                    value={relationships}
                    onChange={(e) => setRelationships(e.target.value)}
                    placeholder="Describe important relationships..."
                    rows="3"
                />
            </div>

      
            <div className="form-section">
                <h2>4. Key Functionalities *</h2>
                <p className="hint">
                    What are the main actions your system should perform?
                    (Example: "Search books", "Manage borrowings")
                </p>
                <textarea
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    placeholder="List 3-5 essential features..."
                    rows="4"
                    required
                />
            </div>

        
            <button
                onClick={generateDiagram}
                disabled={loading}
                className="generate-button"
            >
                {loading ? 'Generating...' : 'Generate UML Diagram'}
            </button>

            {error && <p className="error-message">{error}</p>}

            {umlDiagramSvg && (
                <div className="diagram-result">
                    <div className="diagram-header">
                        <h2>Generated UML Diagram</h2>
                        <button 
                            onClick={downloadSvg}
                            className="download-button"
                        >
                            Download SVG
                        </button>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: umlDiagramSvg }} />
                </div>
            )}
        </div>
    );
}

export default DiagramPage;