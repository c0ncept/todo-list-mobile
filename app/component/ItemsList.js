import React, {Component} from 'react';
import {connect} from 'react-redux';
import Slider from 'react-slick';
import IScroll from 'iscroll/build/iscroll';

class ItemsList extends Component {

  constructor() {
    super();
    this.scrollOptions = {
      mouseWheel: true,
      scrollbars: false,
      scrollX: false,
      scrollY: true
    }
    this.settings = {
      dots: true,
      infinite: false,
      arrows: false,
      speed: 200,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: true,
      touchThreshold : 3000,
      className : 'items_list--wrapper',
      initialSlide : 0,
      afterChange : this.afterChange.bind(this)
    }
    this.state = {
      currentSlide : 0
    }
  }

  slideTo(n) {
    if (this.state.currentSlide === n) {
      return ;
    }
    this.setState({
      currentSlide : n
    });
  }

  afterChange(n) {
    [].slice.call(document.querySelectorAll('.items_list--tab'))
    .map((t) => t.classList.remove('active'));
    document.querySelector(`.items_list--tab:nth-child(${n + 1})`)
      .classList.add('active');
  }

  compileItem(i, n) {
    let itemCls = 'items_list--item';
    itemCls += i.completed === false ? ' completed'  : '';

    return (
      <div key={i.title+n} className={itemCls}>
       <div className="items_list--item--checkbox">
        {
          i.completed === true ?
            <i className="fa fa-check" aria-hidden="true"></i>
          : <i className="fa fa-info" aria-hidden="true"></i>
        }
       </div>
       <div className="items_list--item--title">
        {i.title}
       </div>
      </div>
    )
  }

  componentDidMount() {
    const allItems = document.getElementById('items-all');
    new IScroll(allItems, this.scrollOptions);
  }

  render() {
    let items = {
      all        : this.props.state.map(this.compileItem),
      complete   : this.props.state.filter(i => i.completed === true).map(this.compileItem),
      incomplete : this.props.state.filter(i => i.completed === false).map(this.compileItem)
    }

    return (
      <div className="items_list">

          <Slider {...this.settings} slickGoTo={this.state.currentSlide}>
            <div className="items_list--screen">
              <div id="items-all" className="items_list--scroll">
                <div>
                  {items.all}
                </div>
              </div>
            </div>
            <div className="items_list--screen">
              {items.complete}
            </div>
            <div className="items_list--screen">
              {items.incomplete}
            </div>
          </Slider>

        <div className="items_list--tabs">
          <div className="items_list--tab active" onClick={this.slideTo.bind(this, 0)}>
            <small>ALL</small>
          </div>
          <div className="items_list--tab" onClick={this.slideTo.bind(this, 1)}>
            <i className="fa fa-check-square-o" aria-hidden="true"></i>
          </div>
          <div className="items_list--tab" onClick={this.slideTo.bind(this, 2)}>
            <i className="fa fa-square-o" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({state}))(ItemsList);
