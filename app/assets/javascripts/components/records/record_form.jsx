var RecordForm = React.createClass({
	getInitialState:function() {
		return {
			title: '',
			date: '',
			amount: '',
			error: ''
		}
	},
	inputChangeHandler : function (event) {
	    var stateObject = function() {
	      returnObj = {};
	      returnObj[this.target.id] = this.target.value;
	         return returnObj;
	    }.bind(event)();
	    this.setState( stateObject );    
	},
	handleChange:function(e){
		e.preventDefault()
		var stateObject = {}
		var inputName = e.target.name
		stateObject[inputName] = e.target.value
		this.setState(stateObject)
	},
	handleSubmit:function(e) {
		e.preventDefault()
		if (this.valid()) {
			$.ajax({
				url: '/records',
				type: 'POST',
				dataType: 'JSON',
				data: {record: this.state},
				success: function(record) {
					this.props.handleNewRecord(record)
					this.setState(this.getInitialState())
					console.log("Record was saved!");
				}.bind(this),
				error: function() {
					console.log("Record was unable to persist...");
				}.bind(this)
			})
		}
		else {
			this.setState({
				error: 'Please fill out all fields to submit record.'
			})
		}
	},
	valid:function() {
		return (
			this.state.title && this.state.date && this.state.amount
		)
	},
	render:function() {
		var error = this.state.error
		return (
			<div className="container-fluid record-form-container">
				<div className='record-form'>
					<div className="error-message form-group">
							{error}
					</div>
					<form className="form-inline pagination-centered" onSubmit={this.handleSubmit}>
						<div className="form-group">
							<input type="date" className="form-control" placeholder="Date" name="date" value={this.state.date} onChange={this.handleChange}/>
						</div>
						<div className="form-group">
							<input type="text" className="form-control" placeholder="Title" name="title" value={this.state.title} onChange={this.handleChange}/>
						</div>
						<div className="form-group">
							<input type="number" step="0.01" className="form-control" placeholder="Amount" name="amount" value={this.state.amount} onChange={this.handleChange}/>
						</div>
						<button type='submit' className='btn btn-primary'>Create Record</button>
					</form>
				</div>
			</div>
		)
	}
})