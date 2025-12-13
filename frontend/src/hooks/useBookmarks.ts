import { useState, useEffect } from 'react';
import { type Study } from '../api/getClinicalTrial';

export const useBookmarks = () => {
    const [bookmarks, setBookmarks] = useState<Study[]>(() => {
        const saved = localStorage.getItem('trial-bookmarks');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('trial-bookmarks', JSON.stringify(bookmarks));
    }, [bookmarks]);

    const addBookmark = (study: Study) => {
        setBookmarks((prev) => {
            if (prev.some((b) => getTrialId(b) === getTrialId(study))) {
                return prev;
            }
            return [...prev, study];
        });
    };

    const removeBookmark = (studyId: string) => {
        setBookmarks((prev) => prev.filter((b) => getTrialId(b) !== studyId));
    };

    const isBookmarked = (studyId: string) => {
        return bookmarks.some((b) => getTrialId(b) === studyId);
    };

    const getTrialId = (study: Study) => {
        return study.protocolSection?.identificationModule?.nctId || '';
    };

    return { bookmarks, addBookmark, removeBookmark, isBookmarked };
};
