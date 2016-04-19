import React, {Component} from 'react';
import {connect} from 'react-redux';
import Slider from 'react-slick';

import {Actions} from 'reducer/filter';

class ItemsList extends Component {

  constructor() {
    super();
    this.state = {
      currentSlide : 0
    }
  }


  slideTo(n) {
    this.setState({
      currentSlide : n
    });
  }

  afterChange(n) {
    [].slice.call(document.querySelectorAll('.items_list--tab'))
    .map((t) => t.classList.remove('active'));
    document.querySelector(`.items_list--tab:nth-child(${n+1})`)
      .classList.add('active');
  }

  render() {
    let items = this.props.state.items.filter((i) => {
      return !this.props.state.filter.hasOwnProperty('completed') ||
              this.props.state.filter.completed === i.completed;
    });

    const settings = {
      dots: false,
      infinite: false,
      speed: 200,
      slidesToShow: 1,
      slidesToScroll: 1,
      className : 'items_list--wrapper',
      afterChange : this.afterChange.bind(this),
      slickGoTo : this.state.currentSlide
    };

    return (
      <div className="items_list">

          <Slider {...settings}>
            <div className="items_list--screen">
            </div>
            <div className="items_list--screen">
            </div>
            <div className="items_list--screen">
            </div>
          </Slider>

        <div className="items_list--tabs">
          <div className="items_list--tab active" onClick={this.slideTo.bind(this,0)}>
            <i className="fa fa-list" aria-hidden="true"></i>
          </div>
          <div className="items_list--tab" onClick={this.slideTo.bind(this,1)}>
            <i className="fa fa-check-square-o" aria-hidden="true"></i>
          </div>
          <div className="items_list--tab" onClick={this.slideTo.bind(this,2)}>
            <i className="fa fa-square-o" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({state}))(ItemsList);
