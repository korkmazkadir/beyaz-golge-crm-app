
import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

import {
  Input
} from "reactstrap";


import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';


import InstallmentEditorItem from "components/AthleteRegistration/InstallmentEditorItem.jsx";

const installmentListStyle = {
  height: "150px",
  overflowY: "scroll"
};

class InstallmentEditor extends React.Component {
  constructor(props) {
    super(props);

    this.recalculateInstallments = this.recalculateInstallments.bind(this);

    this.addInstallment = this.addInstallment.bind(this);
    this.removeInstallment = this.removeInstallment.bind(this);
    this.showEditModal = this.showEditModal.bind(this);

    this.closeEditModal = this.closeEditModal.bind(this);
    this.updateInstallment = this.updateInstallment.bind(this);

    this.handleInstallmentEdit = this.handleInstallmentEdit.bind(this);

    this.reset = this.reset.bind(this);

    this.getPropsPrice = this.getPropsPrice.bind(this);
    this.getPropsAdvancePayment = this.getPropsAdvancePayment.bind(this);

    this.state = {
      installmentCount : 0,
      installments : [],
      isButtonEnabled : false,
      showModal : false,
      selectedInstallmentIndex : -1,
      selectedInstallment : {
        type : "INSTALLMENT",
        rank : 0,
        isCollected : false,
        amount : 0,
        date : "",
        key : 0,
        index : 0
      },
    };

  }

  reset(){
    this.setState({
        installmentCount : 0,
        installments : [],
        isButtonEnabled : false,
        showModal : false,
        selectedInstallmentIndex : -1,
        selectedInstallment : {
          type : "INSTALLMENT",
          rank : 0,
          isCollected : false,
          amount : 0,
          date : "",
          key : 0,
          index : 0
        },
      });
  }

  getPropsPrice(){
    return Number(this.props.price);
  }

  getPropsAdvancePayment(){
    return Number(this.props.advancePayment);
  }

  closeEditModal(){
    this.setState({showModal : false});
  }

  showEditModal(index){
    this.setState((prevState)=> {return {
      showModal : true,
      selectedInstallmentIndex : index,
      selectedInstallment : JSON.parse(JSON.stringify(prevState.installments[index]))
    }})
  }

  updateInstallment(){
    this.setState((prevState)=> {

      const installments = JSON.parse(JSON.stringify(prevState.installments))
      installments[prevState.selectedInstallmentIndex] = prevState.selectedInstallment;
      return {
        showModal : false,
        installments : installments
      }
    })
  }


  handleInstallmentEdit(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState((prevState)=>{
      var inst = JSON.parse(JSON.stringify(prevState.selectedInstallment))
      inst[name] = value;
      return{ selectedInstallment : inst };
    });
  }

  addInstallment(){
    this.setState((prevState)=>{
      return{
        installmentCount : prevState.installmentCount + 1,
        installments : this.recalculateInstallments(prevState.installmentCount + 1)
      };
    });
  }

  removeInstallment(){
    this.setState((prevState)=>{
      if(prevState.installmentCount === 0)
        return;

      return{
        installmentCount : prevState.installmentCount - 1,
        installments : this.recalculateInstallments(prevState.installmentCount - 1)
      };
    });
  }


  recalculateInstallments(installmentCount){
    var installments = [];

    if(installmentCount == 0){
      this.props.setInstallments(installments);
      return installments;
    }

    var price = this.getPropsPrice() - this.getPropsAdvancePayment();
    var ceilledInstallmentPrice = Math.floor( price / installmentCount);
    if( price > 0){
      for (var i = 0; i < installmentCount; i++) {
        const installmentPrice = ceilledInstallmentPrice;
        if(i+1 === installmentCount){
            installmentPrice = ceilledInstallmentPrice + price - (ceilledInstallmentPrice * installmentCount);
        }

        installments.push({
          type : "INSTALLMENT",
          isCollected : false,
          rank : i+1,
          amount : installmentPrice,
          date : "2018-10-03",
          key : i,
          index : i
        });

      }
    }


    this.props.setInstallments(installments);
    return installments;
  }


  shouldComponentUpdate(nextProps, nextState){
      if(nextProps.price !== this.props.price || nextProps.advancePayment !== this.props.advancePayment ){
        this.props.setInstallments([]);
        this.reset();
      }
      return true;
  }


  render() {

    //installments.push(<InstallmentEditorItem order={i+1} price={ceilledInstallmentPrice} date={"10.09.2018"} key={i} />);

    return (

        <div>
          <Row>

              <Col align="center">
                <Button variant="warning" size="sm" onClick={this.removeInstallment} disabled={!(this.getPropsPrice() > 0)}>
                    Taksit Sil
                </Button>
              </Col>

              <Col align="center">
                <Button variant="outline-info" size="sm" disabled>{this.state.installmentCount}</Button>
              </Col>

              <Col align="center">
                <Button variant="primary" size="sm" onClick={this.addInstallment} disabled={!(this.getPropsPrice() > 0)} >
                    Taksit Ekle
                </Button>
              </Col>

          </Row>

        <Row style={installmentListStyle}>
          <Col align="center">
            {this.state.installments.map((ins)=>(
              <InstallmentEditorItem rank={ins.rank} price={ins.amount} date={ins.date} key={ins.key} onEdit={ ()=>{ this.showEditModal(ins.index) }} />
            ))}
          </Col>
        </Row>


        <Modal show={this.state.showModal} onHide={this.closeEditModal}  size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Taksit Düzenle</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form.Group as={Row}>
              <Form.Label column sm="3">
                Taksit Sırası
              </Form.Label>
              <Col sm="9">
                <Input type="number" value={this.state.selectedInstallment.rank}  disabled/>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">
                Taksit Tarihi
              </Form.Label>
              <Col sm="9">
                <Input type="date" name="date" value={this.state.selectedInstallment.date} onChange={this.handleInstallmentEdit}/>
              </Col>
            </Form.Group>

            <Form>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                Taksit Tutarı
              </Form.Label>
              <Col sm="9">
                <Form.Control type="text" name="amount" value={this.state.selectedInstallment.amount} onChange={this.handleInstallmentEdit} placeholder="Taksit Tutarı" disabled/>
              </Col>
            </Form.Group>

          </Form>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeEditModal}>
              Kapat
            </Button>
            <Button variant="primary" onClick={this.updateInstallment}>
              Kaydet
            </Button>
          </Modal.Footer>
        </Modal>


      </div>

    )
  };

}

  InstallmentEditor.propTypes = {
    price: PropTypes.string,
    advancePayment: PropTypes.string,
    setInstallments : PropTypes.func
  };


  export default InstallmentEditor;
