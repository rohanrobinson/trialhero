import { type Study } from '../api/getClinicalTrial';

interface TrialListProps {
    trials: Study[];
    lastQuery: string;
}

const TrialList = ({ trials, lastQuery }: TrialListProps) => {
    const formatTrial = (study: Study) => {
        const protocol = study.protocolSection;
        const identification = protocol?.identificationModule;
        const status = protocol?.statusModule;
        const description = protocol?.descriptionModule;

        return {
            nctId: identification?.nctId || 'N/A',
            title: identification?.briefTitle || identification?.officialTitle || 'No title',
            status: status?.overallStatus || 'Unknown',
            startDate: status?.startDateStruct?.date || 'Unknown',
            summary: description?.briefSummary || 'No summary available',
        };
    };

    return (
        <>
            <h4 className="searchResultsHeader">Search Results: {lastQuery}</h4>
            <div className="trialsList">
                {trials.map((study) => {
                    const trial = formatTrial(study);
                    return (
                        <div key={trial.nctId} className="trialCard">
                            <h3>{trial.title}</h3>
                            <p className="trialId">
                                NCT ID: <a href={`https://clinicaltrials.gov/study/${trial.nctId}`} target="_blank" rel="noopener noreferrer" className="trialLink">{trial.nctId}</a>
                            </p>
                            <p className="trialStatus">Status: {trial.status}</p>
                            <p className="trialSummary">{trial.summary}</p>
                            <a href={`https://clinicaltrials.gov/study/${trial.nctId}`} target="_blank" rel="noopener noreferrer" className="viewTrialLink">View on ClinicalTrials.gov →</a>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default TrialList;
