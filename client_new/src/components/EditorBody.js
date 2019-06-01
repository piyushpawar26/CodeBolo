import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import 'codemirror/theme/material.css';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/darcula.css';
import 'codemirror/theme/nord.css';
import 'codemirror/theme/pastel-on-dark.css';
import 'codemirror/addon/scroll/simplescrollbars.js';
import 'codemirror/addon/scroll/simplescrollbars.css';


class EditorBody extends Component {

    render() {

        const options = {
            lineNumbers: true,
            indentUnit: 4,
            theme: "material",
            scrollbarStyle: "overlay"
        };

        return (
            <div className="editor-body">
                <AppBar position="static" style={{ backgroundColor: '#263238' }} >
                    <Tabs value={ this.props.state.tabIndex } onChange={ this.props.handleChange } >
                        <Tab label={<span className="editor-tab-label">JS</span>} />
                        <Tab label={<span className="editor-tab-label">HTML</span>} />
                        <Tab label={<span className="editor-tab-label">CSS</span>} />
                    </Tabs>
                </AppBar>
                <CodeMirror ref="editor" onChange={ this.props.onChange } options={ options } autoFocus={ true } />
            </div>
        );
    }
}

export default EditorBody
