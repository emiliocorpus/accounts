var Records = React.createClass({
	getInitialState:function() {
		return {
			records: this.props.data
		}
	}, 
	getInitialProps:function(){
		return {
			records: []
		}
	},
	addRecord:function(record) {
		debugger
		var currentRecords = this.state.records
		currentRecords.push(record)
		this.setState({
			records: currentRecords
		})
	},
	render:function() {
		var display=[]
		var records = this.state.records
		if (records.length>0) {
			for (var i in records) {
				display.push(<Record record={records[i]} key={records[i].id}/>)
			}
		}
		return (
			<div className="records">
				<h2 className="title"> Records </h2>
				<table className='table table-bordered'>
					<thead>
						<tr>
							<th>'Date'</th>
							<th>'Title'</th>
							<th>'Amount'</th>
						</tr>
					</thead>
					<tbody>
						{display}
					</tbody>
				</table>
				<RecordForm handleNewRecord={this.addRecord}/>
			</div>
		)
	}
})