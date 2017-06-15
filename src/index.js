import React from 'react';
import ReactDOM from 'react-dom';
import ClassNames from 'classnames';
import data from './data.json';
import './index.css';

class TreeView extends React.Component {
    constructor() {
        super();
        this.state = {
            isVisible: true
        };
        this.toggleChildren = this.toggleChildren.bind(this);
    }

    toggleChildren() {
        this.setState({isVisible: !this.state.isVisible});
    }

    render() {
        var childrenNodes;
        const currentNode = this.props.nodes;
        const onClickFcn = this.props.onClick;

        if (currentNode.next_product_categories) {
            childrenNodes = currentNode.next_product_categories.map((node, index) => {
                return (
                    <li key={index}>
                        <TreeView nodes={node} onClick={onClickFcn} />
                    </li>
                );
            });
        }

        // Only render the unordered list when the children nodes are not empty
        const hasChildrenNodes = childrenNodes && childrenNodes.length > 0;
        const childrenNodesList = hasChildrenNodes ? <ul className="childrenNodes">{childrenNodes}</ul> : null;
        const categoryClass = ClassNames({
            "categoryName": true,
            "togglable": hasChildrenNodes,
            "expandChildren": this.state.isVisible,
            "collapseChildren": !this.state.isVisible
        });
        return (
            <div>
                <div className={categoryClass}
                    onClick={() => {
                        if (!hasChildrenNodes) {
                            onClickFcn(currentNode);
                        }
                        this.toggleChildren();
                    }}
                >
                    {currentNode.product_category_name}
                </div>
                {childrenNodesList}
            </div>
        );
    }
}

class NewProductInfo extends React.Component {
    render() {
        return (
            <div className="newProductInfoPane">
                <div className="productInfoRow">
                    <span>Customer Id:</span>
                    <span>{this.props.customerId}</span>
                </div>
                <div className="productInfoRow">
                    <span>Product Category:</span>
                    <span>{this.props.category}</span>
                </div>
                <div className="productInfoRow">
                    <span>Price:</span>
                    <span>{this.props.price}</span>
                </div>
                <div className="productInfoRow">
                    Customer Name (optional): <input type="text" name="name"
                        onChange={this.props.onNameChange}/>
                </div>
                <div className="saveOrDismiss">
                    <button className="saveResultButton"
                            onClick={this.props.onSaveClick}
                    >
                        Save
                    </button>
                    <button className="dismissChangeButton"
                            onClick={this.props.onDismissClick}
                    >
                        Dismiss
                    </button>
                </div>
            </div>
        );
    }
}

class ProductList extends React.Component {
    render() {
        const customerName = this.props.customerName ?
            " (" + this.props.customerName + ")" :
            "";
        return (
            <div className="savedProductInfo">
                <span>{this.props.customerId}</span>
                <span>{customerName}</span>
                -
                <span>{this.props.category}</span>
            </div>
        );
    }
}

class AddNewProduct extends React.Component {
    constructor() {
        super();
        this.state = {
            isShowingProductOption: false,
            savedProductInfos: [],
            customerName: "",
            lastId: 0
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.handleDismissClick = this.handleDismissClick.bind(this);
    }

    handleNameChange(event) {
        this.setState({customerName: event.target.value});
    }

    handleSaveClick() {
        let savedProductInfos = this.state.savedProductInfos.slice(0);
        const currentId = this.state.lastId + 1;
        savedProductInfos.push(<ProductList key={currentId}
            customerName={this.state.customerName}
            customerId={this.state.lastId}
            category={this.props.category}
        />);
        this.setState({savedProductInfos: savedProductInfos, lastId: currentId});
    }

    handleDismissClick() {
        this.setState({isShowingProductOption: false});
    }

    render() {
        const productInfo = this.state.isShowingProductOption ?
            <NewProductInfo
                customerId={this.state.lastId}
                category={this.props.category}
                price={this.props.price}
                onNameChange={this.handleNameChange}
                onSaveClick={this.handleSaveClick}
                onDismissClick={this.handleDismissClick}
            /> :
            null;
        return (
            <div className="addNewPane">
                <div className="addNewTool">
                    <button
                        className="addNewButton"
                        onClick={() => this.setState({isShowingProductOption: true})}
                    >
                    + Add New Product
                    </button>
                </div>
                {this.state.savedProductInfos}
                {productInfo}
            </div>
        );
    }
}

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            productCategory: "Hot Chocolate",
            productPrice: "10"
        };
        this.handleCategoryClick = this.handleCategoryClick.bind(this);
    }

    handleCategoryClick(selectedCategory) {
        this.setState({
            productCategory: selectedCategory.product_category_name,
            productPrice: selectedCategory.price
        });
    }

    renderCategory(categoryInfo) {
        const onClickFcn = this.handleCategoryClick;
        return <TreeView nodes={categoryInfo} onClick={onClickFcn} />;
    }

    render() {
        const categories = this.props.categories.map((categoryInfo, index) => {
            return (
                <div key={index} className="productCategory">
                    {this.renderCategory(categoryInfo)}
                </div>
            );
        })

        return (
            <div className="mainPage">
                <div className="categoryPane">{categories}</div>
                <AddNewProduct
                    category={this.state.productCategory}
                    price={this.state.productPrice}
                 />
            </div>
        );
    }
}

ReactDOM.render(
    <Main categories={data.product_categories}/>,
    document.getElementById('root')
);
