import React, { Component } from 'react';
import EditorHeader from './components/EditorHeader';
import { connect } from 'react-redux';
import actionSpeak from './actions/ActionSpeak';
import EditorBody from './components/EditorBody';
import lodash from 'lodash';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';

var beautify = require('js-beautify').js;

class App extends Component {

    constructor(props) {
        super(props);
        this.cm = React.createRef();
        this.editor = null;
        this.recognition = null;
        this.state = {
            value: props.value,
            payload: props.payload,
            tabs: props.tabs,
            tabIndex: props.tabIndex
        };
    }

    componentDidMount() {
        this.editor = this.cm.current.refs.editor.getCodeMirror();
        var newValue = this.showCurrentTab();
        this.editor.getDoc().setValue(newValue);
        try {
            var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
        } catch (e) {
            console.error("Browser doesn't support speech reccognition");
        }
    }

    insertAtCursor = (myPayload) => {
        var doc = this.editor.getDoc();
        var cursor = doc.getCursor();
        doc.replaceRange(myPayload, cursor);
        return this.editor.getValue();
    }

    setNewValue = (newValue) => {
        this.editor.getDoc().setValue(newValue);
        var currentTabIndex = this.state.tabIndex;
        var currentTabs = this.state.tabs;
        var remainingTabs = lodash.filter(currentTabs, (tab) => {
            return tab.index !== currentTabIndex;
        });
        var newTab = {
            index: currentTabIndex,
            content: newValue
        };
        this.setState({
            ...this.state,
            tabs: [...remainingTabs, newTab],
            value: newValue
        });
        setTimeout(() => console.log(this.state), 500);
    }

    beautifyCode = () => {
        var newValue = beautify(this.editor.getValue(), { indent_size: 4, space_in_empty_paren: true });
        this.setNewValue(newValue);
    }

    onClick = (e, option) => {
        if(option === "bolo") {
            this.recognition.start();
        } else if(option === "code") {
            this.beautifyCode();
        } else {
            console.log("3");
        }
        this.recognition.onresult = (event) => {
            const speechToText = event.results[0][0].transcript;
            this.props.speak(this.state, speechToText);
        }
    }

    onChange = (newValue) => {
        var currentTabIndex = this.state.tabIndex;
        var currentTabs = this.state.tabs;
        var remainingTabs = lodash.filter(currentTabs, (tab) => {
            return tab.index !== currentTabIndex;
        });
        var newTab = {
            index: currentTabIndex,
            content: newValue
        };
        this.setState({
            ...this.state,
            tabs: [...remainingTabs, newTab]
        });
        // setTimeout(() => console.log(this.state), 300);
    }

    handleChange = (event, tabIndex) => {
        this.setState({
            ...this.state,
            tabIndex
        });
        setTimeout(() => this.editor.getDoc().setValue(this.showCurrentTab()), 300);
    };

    showCurrentTab = () => {
        var currentTabs = this.state.tabs;
        var currentTabIndex = this.state.tabIndex;
        var currentTab = lodash.find(currentTabs, (o) => o.index === currentTabIndex);
        return currentTab.content;
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if(nextProps.payload === 'BEAUTIFY') {
            this.beautifyCode();
        } else if(nextProps.payload.slice(0, 3) !== 'P3P') {
            var newValue = this.insertAtCursor(nextProps.payload);
            this.setNewValue(newValue);
        } else {
            ToastsStore.info('Sorry, say it again.');
        }
    }

    render() {
        return (
            <div className="App">
                <div className="container editor z-depth-2">
                    <EditorHeader state={ this.state } onClick={ this.onClick.bind(this) } />
                    <EditorBody state={ this.state } ref={ this.cm } onChange={ this.onChange.bind(this) } handleChange={ this.handleChange.bind(this) } />
                </div>
                <ToastsContainer store={ ToastsStore } position={ ToastsContainerPosition.BOTTOM_RIGHT } />
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        value: state.value,
        payload: state.payload,
        tabs: state.tabs,
        tabIndex: state.tabIndex
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        speak: (state, speech) => dispatch(actionSpeak(state, speech))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
