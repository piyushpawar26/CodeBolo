import React from 'react';

const EditorHeader = (props) => {

    return (
        <div>
            <div className="editor-title noselect"><code>Code<span className="editor-title-hindi">बोलो</span></code></div>
            <div className="editor-options">
                <button className="editor-controllers" onClick={ (e) => { props.onClick(e, "bolo") } }>
                    <span><i className="material-icons">mic</i></span>
                </button>
                <button className="editor-controllers" onClick={ (e) => { props.onClick(e, "code") } }>
                    <span><i className="material-icons">code</i></span>
                </button>
                <button className="editor-controllers" onClick={ (e) => { props.onClick(e, "settings") } }>
                    <span><i className="material-icons">settings</i></span>
                </button>
            </div>
        </div>
    );

}

export default EditorHeader;
