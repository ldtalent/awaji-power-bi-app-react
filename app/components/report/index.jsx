import React, { useEffect, useState } from 'react';

import * as pbi from 'powerbi-client';
import fetchJsonp from 'fetch-jsonp';

import ReportToggle from '../reportToggle/index.jsx';

import embedConfig from '../../utility/config';

import './index.scss';

const Report = () => {
    const [viewMode, setViewMode] = useState('view');
    const [reportResponse, setReportResponse] = useState({
        reportId: "",
        embedToken: "",
        embedUrl: ""
    });
    const [radioBtnState, setRadioBtnState] = useState({
        view: true,
        edit: false,
        create: false
    });
    

    const bucket = React.createRef();
    const { view, edit, create } = radioBtnState;

    const radioArray = [
        { name: 'view', active: view },
        { name: 'edit', active: edit },
        { name: 'create', active: create },
    ];

    const getReportEmbedType = (embedType) => {
        setViewMode(embedType);
        setRadioBtnState({
            view: false,
            edit: false,
            create: false,
            [embedType]: true
        });
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
                reportId: response.ReportId,
                embedToken: response.EmbedToken,
                embedUrl: response.EmbedUrl
            });
        } catch (err) {
            alert(err.message);
        }
    };

    useEffect(() => {
        const url = process.env.AZURE_URL;
        getUrl(url);
    }, []);

    useEffect(() => {
        powerbi.reset(bucket.current);
        const { reportId, embedToken, embedUrl } = reportResponse;

        if (reportId) renderReport(reportId, embedToken, embedUrl);
    }, [reportResponse, viewMode]);

    return (
        <div>
            <ReportToggle radioBtnArray={radioArray} radioBtnOnChange={getReportEmbedType} />
            <div ref={bucket} className="report" />
        </div>
    );
};

export default Report;
