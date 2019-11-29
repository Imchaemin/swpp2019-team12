import React, { Component } from 'react';
// import ConfigurationDialog from './configuration-dialog';
import Editor from './Editor';
import axios from 'axios';

export default class EditorWrapper extends Component {
    state = {
        selectedUser: {
            // id: this.props.currentUserProfile['id'],
            // name: this.props.currentUserProfile.nickname
            id: null,
            name: null
        },
        configuration: {
            documentId: '36ur9q8hprg',
            tokenUrl:
                'https://43733.cke-cs.com/token/dev/3TvgNvZRyzXDDc7dsBXDBuM0cFITPrq26HUfIlLHXo0Zjcwgm3nxOWSeBSU8',
            uploadUrl: 'https://43733.cke-cs.com/easyimage/upload/',
            webSocketUrl: '43733.cke-cs.com/ws'
        },
        updated: false
    };

    componentDidMount() {
        axios.get('api/profile/').then(res => {
            console.log('res in wrapper:', res);
            this.setState({
                selectedUser: {
                    id: res.data.profile.id,
                    name: res.data.profile.nickname
                }
            });
        });
    }

    setTokenUrl(data) {
        console.log('Set token url');
        console.log('config: ', this.state.configuration);
        let config = this.state.configuration;
        config.tokenUrl =
            `${getRawTokenUrl(config.tokenUrl)}?` +
            Object.keys(data)
                .filter(key => data[key])
                .map(key => {
                    if (key === 'role') {
                        return `${key}=${data[key]}`;
                    }

                    return `user.${key}=${data[key]}`;
                })
                .join('&');

        this.setState({ config: config, updated: true });
    }

    render() {
        console.log('Editor Wrapper rendered');
        if (!this.state.updated) this.setTokenUrl(this.state.selectedUser);
        return (
            <Editor
                selectedUser={this.state.selectedUser}
                configuration={this.state.configuration}
            />
        );
    }
}

function isCloudServicesTokenEndpoint(tokenUrl) {
    return /cke-cs[\w-]*\.com\/token\/dev/.test(tokenUrl);
}

function getRawTokenUrl(url) {
    if (isCloudServicesTokenEndpoint(url)) {
        return url.split('?')[0];
    }

    return url;
}
