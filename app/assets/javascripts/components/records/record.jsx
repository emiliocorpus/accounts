var Record = React.createClass({
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
	render:function(){
		return (
			<tr>
				<td>{this.props.record.date}</td>
				<td>{this.props.record.title}</td>
				<td>{amountFormat(this.props.record.amount)}</td>
				<td>
					<a href="#" className="btn btn-danger" onClick={this.handleDelete}>Delete</a>
				</td>
			</tr>
		)
	}
})