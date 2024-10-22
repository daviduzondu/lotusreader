import { useState, useEffect, useRef } from 'react';

const cache = {}; // This will persist across component mounts

function useFetchAll(type, page = 1) {
    const [news, setNews] = useState(cache[type] ? cache[type] : []); // Initialize with cache if available
    const [loading, setLoading] = useState(true);
    const prevType = useRef(type); // To keep track of the previous type

    useEffect(() => {
        if (!cache[type]) cache[type] = []; // Ensure cache is initialized for the type

        // Only refetch if there's no data for the requested page
        if (!cache[type][page]) {
            if (page > 1) setLoading(false);
            fetch(`https://node-hnapi.herokuapp.com/${type}?page=${page}`)
                .then(response => response.json())
                .then(data => {
                    cache[type][page] = data; // Cache the data for this page
                    const allData = cache[type].flat(); // Flatten to get all pages data

                    setNews(allData); // Update state with all pages' data
                    setLoading(false);
                })
                .catch(error => {
                    console.error(error);
                    setLoading(false);
                });
        } else {
            // If the data is already in cache, just update state
            const allData = cache[type].flat();
            setNews(allData);
            setLoading(false);
        }

        // If `type` changes, reset pagination cache and start fresh
        if (prevType.current !== type) {
            prevType.current = type;
            setNews([]);
            cache[type] = []; // Reset cache for new type
        }
    }, [type, page]);

    return { news, loading };
}

export default useFetchAll;
