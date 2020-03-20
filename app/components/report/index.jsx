import React, { useEffect, useState } from 'react';

import * as pbi from 'powerbi-client';
import fetchJsonp from 'fetch-jsonp';

import ReportToggle from '../reportToggle/index.jsx';

import embedConfig from '../../utility/config';

import './index.scss';

const Report = () => {
    const [viewMode, setViewMode] = useState('view');
    const [ reportResponse, setReportResponse ] = useState({
        reportId: "",
        embedToken: "",
        embedUrl: ""
    });

    const bucket = React.createRef();
    const radioArray = ['create', 'view', 'edit'];

    const getReportEmbedType = (embedType) => {
        setViewMode(embedType);
    };

    const renderReport = (reportId, embedToken, embedUrl) => {
        const embedConfigObject = embedConfig(
            viewMode,
            reportId,
            embedToken,
            embedUrl,
            pbi
        );

        (viewMode === 'create') ?
            powerbi.createReport(bucket.current, embedConfigObject) :
            powerbi.embed(bucket.current, embedConfigObject);
    };

    const getUrl = async (url) => {
        try {
            const response = await fetchJsonp(url, {
                jsonpCallbackFunction: 'callback'
            }).then(response => response.json())

            setReportResponse({
                reportId:  response.ReportId,
                embedToken: response.EmbedToken,
                embedUrl: response.EmbedUrl
            });
        } catch (err) {
            alert(err.message);
        }
    };

    useEffect(() => {
        const url = 'https://pbifunc2.azurewebsites.net/api/HttpTriggerCSharp1?code=dl9o4wFwwLKuJubIrukK0Gg9vd6JVStRiuUQiS6/lta1aLhNVW55cA==';
        getUrl(url);
    }, []);

    useEffect(() => {
        const {reportId, embedToken, embedUrl} = reportResponse;

        if(reportId) renderReport(reportId, embedToken, embedUrl);
    }, [reportResponse, viewMode]);

    return (
        <div>
            <ReportToggle radioBtnArray={radioArray} radioBtnOnChange={getReportEmbedType} />
            <div ref={bucket} className="report" />
        </div>
    );
};

export default Report;
