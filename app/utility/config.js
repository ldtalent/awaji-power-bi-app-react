export default (
    reportAction,
    id,
    accessToken,
    embedUrl,
    pbiInstance
) => {
    return {
        create: {
            tokenType: pbiInstance.models.TokenType.Embed,
            accessToken,
            embedUrl,
            datasetId: ''
        },
        edit: {
            type: 'report',
            tokenType: pbiInstance.models.TokenType.Embed,
            accessToken,
            embedUrl,
            id,
            permissions: pbiInstance.models.Permissions.All /*gives maximum permissions*/,
            viewMode: pbiInstance.models.ViewMode.Edit,
            settings: {
                filterPaneEnabled: true,
                navContentPaneEnabled: true
            }
        },
        view: {
            type: 'report',
            tokenType: pbiInstance.models.TokenType.Embed,
            accessToken,
            embedUrl,
            id,
            permissions: pbiInstance.models.Permissions.Read /*gives view only permissions*/,
            viewMode: pbiInstance.models.ViewMode.View,
            settings: {
                filterPaneEnabled: true,
                navContentPaneEnabled: true
            }
        },
    }[reportAction]
};
