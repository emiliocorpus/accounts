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
		var currentRecords = React.addons.update(this.state.records, {$push: [record]})
		this.setState({
			records: currentRecords
		})
	},
	deleteRecord:function(record){
		var index = this.state.records.indexOf(record)
		var records = React.addons.update(this.state.records, {$splice: [[index,1]]})
		this.replaceState({
			records: records
		})
	},
	updateRecord:function(record, data){
		var index = this.state.records.indexOf(record)
		var records = React.addons.update(this.state.records, {$splice:[[index,1,data]]})
		this.replaceState({
			records: records
		})
	},
	credits:function() {
		var credits = this.state.records.filter(function(val){
			if (val.amount >=0) {
				return val
			}
		})
		return credits.reduce(function(prev, curr) {
			return prev + parseFloat(curr.amount)
		},0)

	},
	debits:function(){
		var debits = this.state.records.filter(function(val){
			if (val.amount < 0) {
				return val
			}
		})
		return debits.reduce(function(prev,curr) {
			return prev + parseFloat(curr.amount)
		},0)
	},
	balance:function(){
		return ( this.debits() + this.credits())
	},
	render:function() {
		var display=[]
		var records = this.state.records
		if (records.length>0) {
			for (var i in records) {
				display.push(<Record record={records[i]} key={records[i].id} handleDeleteRecord={this.deleteRecord} handleEditRecord={this.updateRecord}/>)
			}
		}
		return (
			<div className="records">
				<h2 className="title"> Records </h2>
				<table className='table table-bordered'>
					<thead>
						<tr>
							<th>Date</th>
							<th>Title</th>
							<th>Amount</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{display}
					</tbody>
				</table>
				<hr/>
				<RecordForm handleNewRecord={this.addRecord}/>
				<AmountBox type='success' amount={this.credits()} text='Credit'/>
				<AmountBox type='danger' amount={this.debits()} text='Debit'/>
				<AmountBox type='info' amount={this.balance()} text='Balance'/>
			</div>
		)
	}
})