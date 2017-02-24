import React from 'react';
import classnames from 'classnames';
import AceEditor from 'react-ace';
import Message from 'uxcore/lib/Message';

import CopyToClipboard from 'react-copy-to-clipboard';

export default class DemoItem extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	// expand: false
    	expand: props.selectIndex === props.index
    }

    this.toggleCode = this.toggleCode.bind(this);
	}


	onChangeValue(newValue){
		const { data } = this.props;
		this.props.transform({ content: newValue, style: data.style });
	}

	toggleCode(e){
		this.setState({
			expand: !this.state.expand
		})
	}
	

	render(){
		const { data, selectIndex, index, toggleCode, showExpandDemo, toggleFrame, utils } = this.props;
		const { expand } = this.state;

		const paneProps = {
			theme: 'github',
			mode:'jsx',
			width: "100%",
			height: "300px",
			name: "UNIQUE_ID_OF_DIV",
			editorProps: {$blockScrolling: true},
			enableBasicAutocompletion: true,
			enableLiveAutocompletion: true,
			value: data.content,
			onChange: this.onChangeValue.bind(this)
		}

		// console.log(data)

		return(
			<div className={classnames('demo-card', {
	          'demo-expand': expand,
	          'demo-selected': selectIndex == index
	        })}
				onClick={e => toggleFrame(index)}
	    >
				<h3 className="title">{data.meta.title}</h3>
				<CopyToClipboard 
					text={data.content}
					onCopy={() => Message.info('复制成功！')}
					>
					<span className="demo-btn copy-btn">
					<i className='iconfont icon-copy'/>
					</span>
				</CopyToClipboard>
				<span className="demo-btn expand-btn">
					<i className='iconfont icon-expand' 
						onClick={() => showExpandDemo({ 
							title: data.name, 
							content: data.highlightedCode,
							style: data.style ? data.style.highlightedCode : null
						})}
					/>
				</span>
				<span className="demo-btn toggle-btn" onClick={e => this.toggleCode()}>

					<i className={classnames('iconfont', {
              'icon-arrow-up': expand,
              'icon-arrow-down': !expand,
            })} />
        </span>
          {expand && 
          	<div>
          		<AceEditor {...paneProps} />
          		<div className="demo-css-wrap">{data.style && utils.toReactComponent(data.style.highlightedCode)}</div>
          	</div>
          }
			</div>
		);
	}
}
          // <input type="text" ref="content" style={{ display:'none'}} value={data.content}/>