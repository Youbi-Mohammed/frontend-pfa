import React, { useState } from 'react';

function DiagramPage() {
    const [projectExplanation, setProjectExplanation] = useState('');
    const [umlDiagramSvg, setUmlDiagramSvg] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleExplanationChange = (event) => {
        setProjectExplanation(event.target.value);
    };

    const generateDiagram = async () => {
        if (!projectExplanation.trim()) {
            setError('Please enter a project explanation.');
            setUmlDiagramSvg('');
            return;
        }

        setLoading(true);
        setError(null);
        setUmlDiagramSvg(''); // Clear previous diagram

        try {
            // Replace with your actual backend API endpoint
            const response = await fetch('http://localhost:8080/api/v1/diagrams/generate-from-text', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: projectExplanation })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to generate diagram');
            }

            const data = await response.json();

            if (data.plantUmlCode) {
                setUmlDiagramSvg(data.plantUmlCode);
            } else {
                setError('No diagram code received from the backend.');
            }

        } catch (err) {
            console.error('Error generating diagram:', err);
            setError(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            fontFamily: 'sans-serif'
        }}>
            <h1>Project Explanation to UML Diagram</h1>
            <textarea
                value={projectExplanation}
                onChange={handleExplanationChange}
                placeholder="Enter your project explanation here..."
                rows="10"
                cols="80"
                style={{
                    marginBottom: '15px',
                    padding: '10px',
                    fontSize: '16px',
                    borderRadius: '5px',
                    border: '1px solid #ccc'
                }}
            />
            <button
                onClick={generateDiagram}
                disabled={loading}
                style={{
                    padding: '10px 20px',
                    fontSize: '18px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    opacity: loading ? 0.7 : 1
                }}
            >
                {loading ? 'Generating...' : 'Generate UML Diagram'}
            </button>

            {error && (
                <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>
            )}

            {umlDiagramSvg && (
                <div
                    style={{
                        marginTop: '30px',
                        padding: '20px',
                        border: '1px solid #ddd',
                        backgroundColor: '#fff',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        overflow: 'auto',
                        maxWidth: '90%',
                        textAlign: 'center'
                    }}
                    dangerouslySetInnerHTML={{ __html: umlDiagramSvg }}
                />
            )}
        </div>
    );
}

export default DiagramPage;