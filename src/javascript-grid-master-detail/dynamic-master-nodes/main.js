var columnDefs = [
    // group cell renderer needed for expand / collapse icons
    {field: 'name', cellRenderer:'agGroupCellRenderer'},
    {field: 'account'},
    {field: 'calls'},
    {field: 'minutes', valueFormatter: "x.toLocaleString() + 'm'"}
];

var gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData,
    masterDetail: true,
    detailCellRendererParams: {
        detailGridOptions: {
            columnDefs: [
                {field: 'callId'},
                {field: 'direction'},
                {field: 'number'},
                {field: 'duration', valueFormatter: "x.toLocaleString() + 's'"},
                {field: 'switchCode'}
            ],
            onGridReady: function(params) {
                params.api.sizeColumnsToFit();
            }
        },
        getDetailRowData: function (params) {
            params.successCallback(params.data.callRecords);
        }
    },
    isRowMaster: function (dataItem) {
        console.log("asdfasdfasdfadsf");
        return dataItem ? dataItem.callRecords.length > 0 : false;
    },
    onGridReady: function(params) {
        setInitialLayout(params.api);
    }
};

function setInitialLayout(api) {
    api.sizeColumnsToFit();

    // arbitrarily expand a row for presentational purposes
    setTimeout(function() {
        var rowCount = 0;
        api.forEachNode(function (node) {
            node.setExpanded(rowCount++ === 1);
        });
    }, 500);
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function() {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);

    agGrid.simpleHttpRequest({url: 'https://raw.githubusercontent.com/ag-grid/ag-grid-docs/latest/src/javascript-grid-master-detail/dynamic-master-nodes/data/data.json'}).then(function(data) {
        gridOptions.api.setRowData(data);
    });
});