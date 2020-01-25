import React, { Component } from "react"
import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'
import '../components/Toggle.css'

    let ClassName = 'scientificoff'
    let bar = '>>'    

    let CAC = 'AC'
    const initialState ={
    displayValue:'0',
    clearDisplay: false,
    operation: null,
    values: [0,0],
    current:0
}


export default class Calculator extends Component {
state = {...initialState}
    constructor (props){
        super(props)
        this.clearMemory= this.clearMemory.bind(this)
        this.setOperation= this.setOperation.bind(this)
        this.addDigit= this.addDigit.bind(this)
        this.Switch = this.Switch.bind(this)
    }

    Switch(e) {
        if(bar === '>>'){
            ClassName = 'scientificon'
            bar = '<<'
            this.setState({})   
        } else {
            bar = '>>'
            ClassName = 'scientificoff'
            this.setState({})   
        }
        
        
    }
clearMemory() {
    CAC = 'AC'
    this.setState({...initialState})
}

setOperation (operation){
    if (this.state.current === 0){
        this.setState({operation, current: 1, clearDisplay: true})
    }else {
        const equals = operation === '='
        const currentOperation = this.state.operation

        const values = [...this.state.values]

        switch(currentOperation) {
            case '*':
            values[0] = (values[0] * values[1]).toFixed(4)
            break;
            case '/':
             values[0] = (values[0] / values[1]).toFixed(4)
            break;
            case '-':
             values[0] = values[0] - values[1]
            break;
            case '+':
             values[0] = values[0] + values[1]
            break;
            case 'tan':
                values[0] = Math.tan(values[1]).toFixed(4)
            break;
            case 'cos':
                values[0] = Math.cos(values[1]).toFixed(4)
            break;
            case 'sin':
                values[0] = Math.sin(values[1]).toFixed(4)
            break;
            case 'Root':
                values[0] = Math.sqrt(values[1]).toFixed(4)
            break;
            case 'x^-1':
                values[0] = values[0] ** (-1)
            break;
            case 'x^2':
                values[0] = values[0] ** 2
            break;
            case 'x^3':
                values[0] = values[0] ** 3
            break;
            case 'x^y':
                values[0] = values[0] ** values[1]
            break;
            case 'Log':
                values[0] = Math.log10(values[0]).toFixed(4)
            break;
            case '(-)':
                values[0] = values[0] * - 1
            break;
            
            default:
    }
        values[1] = 0
        this.setState({
            displayValue:values[0],
            operation:equals?null:operation,
            current: equals ? 0 : 1,
            clearDisplay: !equals,
            values
        })
    }
}

addDigit(n) {
    if (n === '.' && this.state.displayValue.includes('.')){
        return 
    }
    
    if( n === "PI"){
        n = Math.PI.toFixed(6)
    } 
    if( n === "e"){
        n = Math.E.toFixed(6)
    }


    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + n
    this.setState({displayValue, clearDisplay: false})

    if (n !== '.'){
        CAC = 'C'
        const i = this.state.current
        const newValue = parseFloat(displayValue)
        const values = [...this.state.values]
        values[i] = newValue
        this.setState ({values})
    }
}


    render () {

        return (
        <div>
            <div className= 'calculator'>
                <Display value={this.state.displayValue}/>
                <Button label = {bar} click = {this.Switch} toggle/>
                <Button label  = {CAC} click={this.clearMemory} triple/>
                <Button label = "/" click={this.setOperation} operation/>
                <Button label = "7" click={this.addDigit}/>
                <Button label = "8" click={this.addDigit}/>
                <Button label = "9" click={this.addDigit}/>
                <Button label = "*" click={this.setOperation} operation/>
                <Button label = "4" click={this.addDigit}/>
                <Button label = "5" click={this.addDigit}/>
                <Button label = "6" click={this.addDigit}/>
                <Button label = "-" click={this.setOperation}operation/>
                <Button label = "1" click={this.addDigit}/>
                <Button label = "2" click={this.addDigit}/>
                <Button label = "3" click={this.addDigit}/>
                <Button label = "+" click={this.setOperation}operation/>
                <Button label = "0" click={this.addDigit} double/>
                <Button label = "." click={this.addDigit}/>
                <Button label = "=" click={this.setOperation}operation/>
            </div>     
            <div className = {ClassName}>   
            <Button label = "x^-1" click={this.setOperation} />
            <Button label = "Root" click={this.setOperation} />
            <Button label = "x^y" click ={this.setOperation}/>
            <Button label = "(-)" click={this.setOperation} />
            <Button label = "x^2" click={this.setOperation} />
            <Button label = "e" click={this.addDigit} />
            <Button label = "x^3" click={this.setOperation} />
            <Button label = "Log" click={this.setOperation} />
            <Button label = "PI" click={this.addDigit} />
            <Button label = "sin" click={this.setOperation} />
            <Button label = "cos" click={this.setOperation} />
            <Button label = "tan" click={this.setOperation} />
            </div>
            
        </div>
         )
    }

}