import React from 'react'



class MySearchComponent extends React.Component{

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    handleResultSelect;

    render() {
        const {isLoading, value, results} = this.state
        return (
             <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                results={results}
                value={value}
                {...this.props}
            />
            )

    }
}