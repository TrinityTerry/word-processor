import React, {useState} from 'react';
import './Editor.css';
import ContentEditable from 'react-contenteditable';

const Editor = props => {
	// const [textValue, setTextValue] = useState('');
	const [html, setHTML] = useState('');
	const [undoHTML, setUndoHTML] = useState([]);
	const contentEditable = React.createRef();
    
	let typingTimer; //timer identifier

    //user is "finished typing," do something
    const doneTyping = (evt) => {
        const newArray = undoHTML;
        newArray.push(html);
        setUndoHTML(newArray)
        setHTML(evt.target.value)
    }

	//on keyup, start the countdown
	const handleChange = (evt) => {
        // console.log(evt.target.value)
		clearTimeout(typingTimer);
		typingTimer = setTimeout(() => doneTyping(evt), 1000);
	};

	//on keydown, clear the countdown
	const handleKeyDown = () => {
		clearTimeout(typingTimer);
	}


	// <span id="cursor"></span>
	return (
		<ContentEditable
			className='editor'
			innerRef={contentEditable}
			html={html} // innerHTML of the editable div
			disabled={false} // use true to disable editing
            // onChange={getText} // handle innerHTML change
            onKeyDown={handleKeyDown}
            onChange={handleChange}
			tagName='div' // Use a custom HTML tag (uses a div by default)
		/>
	);
};

export default Editor;
