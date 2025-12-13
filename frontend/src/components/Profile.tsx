import { useState } from 'react';
import '../App.css';

interface UserProfile {
    name: string;
    age: string;
    gender: string;
    email: string;
}

interface Questionnaire {
    condition: string;
    location: string;
    priorTreatments: string;
    smoker: string;
}

const Profile = () => {
    const [profile, setProfile] = useState<UserProfile>({
        name: '',
        age: '',
        gender: '',
        email: ''
    });

    const [questionnaire, setQuestionnaire] = useState<Questionnaire>({
        condition: '',
        location: '',
        priorTreatments: '',
        smoker: 'no'
    });

    const [saved, setSaved] = useState(false);

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleQuestionnaireChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setQuestionnaire(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitting Profile:', { profile, questionnaire });
        // Logic to save data or fetch personalized trials would go here
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div>
            <h3>Your Profile</h3>

            <div className="searchBarContainer" style={{ flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Basic Information Section */}
                    <div className="trialCard" style={{ textAlign: 'left' }}>
                        <h3>Basic Information</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Full Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="trialSearchBar"
                                    style={{ width: '100%', boxSizing: 'border-box' }}
                                    value={profile.name}
                                    onChange={handleProfileChange}
                                    placeholder="Jane Doe"
                                    required
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Age:</label>
                                    <input
                                        type="number"
                                        name="age"
                                        className="trialSearchBar"
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                        value={profile.age}
                                        onChange={handleProfileChange}
                                        placeholder="30"
                                        required
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Gender:</label>
                                    <select
                                        name="gender"
                                        className="trialSearchBar"
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                        value={profile.gender}
                                        onChange={handleProfileChange}
                                        required
                                    >
                                        <option value="">Select...</option>
                                        <option value="female">Female</option>
                                        <option value="male">Male</option>
                                        <option value="other">Other</option>
                                        <option value="prefer_not_to_say">Prefer not to say</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="trialSearchBar"
                                    style={{ width: '100%', boxSizing: 'border-box' }}
                                    value={profile.email}
                                    onChange={handleProfileChange}
                                    placeholder="jane@example.com"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Questionnaire Section */}
                    <div className="trialCard" style={{ textAlign: 'left' }}>
                        <h3>Health Questionnaire</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Primary Medical Condition / Interest:</label>
                                <input
                                    type="text"
                                    name="condition"
                                    className="trialSearchBar"
                                    style={{ width: '100%', boxSizing: 'border-box' }}
                                    value={questionnaire.condition}
                                    onChange={handleQuestionnaireChange}
                                    placeholder="e.g., Diabetes, Migraine, Healthy Volunteer"
                                    required
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Location (City, State or Zip):</label>
                                <input
                                    type="text"
                                    name="location"
                                    className="trialSearchBar"
                                    style={{ width: '100%', boxSizing: 'border-box' }}
                                    value={questionnaire.location}
                                    onChange={handleQuestionnaireChange}
                                    placeholder="New York, NY"
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Previous Treatments / Surgeries:</label>
                                <textarea
                                    name="priorTreatments"
                                    className="trialSearchBar"
                                    style={{ width: '100%', boxSizing: 'border-box', minHeight: '80px', fontFamily: 'inherit' }}
                                    value={questionnaire.priorTreatments}
                                    onChange={handleQuestionnaireChange}
                                    placeholder="List any relevant previous treatments..."
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Do you smoke?</label>
                                <select
                                    name="smoker"
                                    className="trialSearchBar"
                                    style={{ width: '100%', boxSizing: 'border-box' }}
                                    value={questionnaire.smoker}
                                    onChange={handleQuestionnaireChange}
                                >
                                    <option value="no">No</option>
                                    <option value="yes">Yes</option>
                                    <option value="former">Former Smoker</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="searchButton" style={{ width: '100%', fontSize: '1.2rem' }}>
                        {saved ? 'Saved!' : 'Save & Find Personalized Trials'}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Profile;
