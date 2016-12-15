import React, {Component} from "react";
import {connect} from "react-redux";
import {visitsIncrement, dashboardAddItem, dashboardEditItem} from "../modules/dashboardReducer";
import Dashboard from "../../../components/Dashboard/dashboard.js";

class DashboardContainer extends Component {

    constructor(props) {
        super(props);
        this.onChangeText().bind(this);
        this.submitAction().bind(this);
        this.itemOnEdit().bind(this);

        this.state = {
            inputValue: '',
            editItemIndex: null
        }
    }

    componentDidMount() {
        this.props.visitsIncrement();
    }

    onChangeText() {
        this.setState({ inputValue: newText});
    }

    itemOnEdit(index) {
        const { list } = this.props;
        const item = list[index];
        this.setState({
            inputValue: item.label,
            editedItemIndex: index
        })
    }

    submitAction() {
        const { dashboardAddItem, dashboardEditItem} = this.props;
        const { inputValue, editItemIndex} = this.state;
        if(editItemIndex === null) {
            dashboardAddItem(editItemIndex);
        } else {
            dashboardEditItem(inputValue, editItemIndex);
        }
        this.state = {
            inputValue: '',
            editItemIndex: null
        }

    }

    render() {
        return <Dashboard {...this.props}
                onChangeText = {this.onChangeText}
                itemOnEdit = {this.itemOnEdit}
                textInput = {inputValue}
                buttonText = {buttonText}

                />
    }
}


const mapActionCreators = {
    visitsIncrement,
    dashboardEditItem,
    dashboardAddItem,
};

const mapStateToProps = (state) => ({
    value: state.dashboard.visitsCount,
    list: state.dashboard.list
});

export default connect(mapStateToProps, mapActionCreators)(DashboardContainer)
