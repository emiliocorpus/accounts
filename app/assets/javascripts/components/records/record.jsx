var Record = React.createClass({
	getInitialState:function(){
		return {
			edit: false
		}
	},
	handleEdit:function(e) {
		e.preventDefault()
		var data = {
			title: ReactDOM.findDOMNode(this.refs.title).value,
			date: ReactDOM.findDOMNode(this.refs.date).value,
			amount: ReactDOM.findDOMNode(this.refs.amount).value
		}
		$.ajax({
			url: '/records/' + this.props.record.id.toString(),
			type: 'PUT',
			dataType: 'JSON',
			data: {record: data},
			success: function(data) {
				this.setState({
					edit: false
				})
				this.props.handleEditRecord(this.props.record, data)
				console.log("Record was updated!");
			}.bind(this),
			error: function() {
				console.log("Record was unable to be updated");
			}.bind(this)
		})
	},
	handleDelete:function(e){
		e.preventDefault()
		$.ajax({
			url: '/records/' + this.props.record.id,
			type: 'DELETE',
			dataType: 'JSON',
			success: function(record) {
				this.props.handleDeleteRecord(this.props.record)
				console.log("Record was deleted!");
			}.bind(this),
			error: function() {
				console.log("Unable to delete");
			}.bind(this)
		})
	},
	handleToggle:function(e){
		e.preventDefault()
		this.setState({
			edit: !this.state.edit
		})
	},
	recordRow:function(){
		return (
			<tr>
				<td>{this.props.record.date}</td>
				<td>{this.props.record.title}</td>
				<td>{amountFormat(this.props.record.amount)}</td>
				<td>
					<a href="#" className="btn btn-default" onClick={this.handleToggle}>Edit</a>
					<a href="#" className="btn btn-danger" onClick={this.handleDelete}>Delete</a>
				</td>
			</tr>
		)
	},
	recordForm:function(){
		return (
			<tr>
				<td>
					<input className='form-control' type='date' defaultValue={this.props.record.date} ref='date'/>
				</td>
				<td>
					<input className='form-control' type='title' defaultValue={this.props.record.title} ref='title'/>
				</td>
				<td>
					<input className='form-control' type='number' step='0.01' defaultValue={this.props.record.amount} ref='amount'/>
				</td>
				<td>
					<a href="#" className="btn btn-default" onClick={this.handleEdit}>Update</a>
					<a href="#" className="btn btn-danger" onClick={this.handleToggle}>Cancel</a>
				</td>
			</tr>
		)
	},
	render:function(){
		if (this.state.edit){
			return this.recordForm()
		}
		else {
			return this.recordRow()
		}
	}
})