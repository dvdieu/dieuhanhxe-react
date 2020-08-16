import React from "react";
import ReactDropzone from "react-dropzone";

const style = {
	height: "100%",
	borderWidth: "0",
	borderStyle: "dashed",
	borderColor: "#fff"
}
const activeStyle = {
	borderWidth: "2px",
	borderColor: "#777"
}
const rejectStyle = {
	backgroundColor: "#ffdddd"
}

const Dropzone = (props) => {
	const onDrop = (files) => {
		// const { uploadFile } = props
		files.forEach(file => {
			console.log("onDrop -> file", file)
			// uploadFile(file)
		})
	}

	const getStyle = (isDragActive, isDragAccept, isDragReject) => ({
		...style,
		...(isDragActive ? activeStyle : {}),
		...(isDragReject ? rejectStyle : {})
	})

	return (
		<ReactDropzone
			onDrop={onDrop}
		>
			{({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => (
				<div
					{...getRootProps({
						onClick: event => event.stopPropagation()
					})}
					style={getStyle(isDragActive, isDragAccept, isDragReject)}
				>
					<input {...getInputProps()} />
					{props.children}
				</div>
			)}
		</ReactDropzone>
	)
}

export default Dropzone;
