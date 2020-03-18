import React, { useEffect } from 'react';
import * as pbi from 'powerbi-client';

import fetchJsonp from 'fetch-jsonp';

import './index.scss';

const Report = () => {
    const bucket = React.createRef();

    const getUrl = async (url) => {
        try {
            const response = await fetchJsonp(url, {
                jsonpCallbackFunction: 'callback'
              }).then(response => response.json())
              
              const embedCreateConfiguration = {
                tokenType: pbi.models.TokenType.Embed,
                accessToken: response.EmbedToken,
                embedUrl: response.EmbedUrl,
                datasetId: ''
              };

            powerbi.createReport(bucket.current, embedCreateConfiguration);
            
        } catch(err) {
            alert(err.message);
        }
    };

    useEffect(() => {
        const url = '';
       getUrl(url);
       console.log(bucket.current)
    }, []);

    return (
        <div ref={bucket} className="report">
        </div>
    );
};

export default Report;
