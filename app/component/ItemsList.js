import React, {Component} from 'react';
import {connect} from 'react-redux';
import Slider from 'react-slick';
import IScroll from 'iscroll/build/iscroll';

import {Actions} from 'reducer/items';

import NewTodo from 'component/NewTodo';
import EditTodo from 'component/EditTodo';

class ItemsList extends Component {

  constructor() {
    super();
    this.scrollOptions = {
      mouseWheel: true,
      scrollbars: false,
      scrollX: false,
      disableMouse: true,
      useTransition : false,
      HWCompositing : false,
      useTransform : true,
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
      currentSlide : 0,
      editable : null,
      showControls : false,
      selectedAll : false
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
    let tab = document.querySelector(`.items_list--tab:nth-child(${n + 1})`)

    if (tab) {
      tab.classList.add('active');
    }

    this.lastSelectedTab = n;
  }

  setEditable(i) {
    this.setState({
      editable : i
    });
  }

  selectAll(completed) {
    this.props.dispatch(Actions.SELECT_ALL(completed));
    this.setState({selectedAll : completed});
  }

  clearCompleted() {
    this.props.dispatch(Actions.CLEAR_COMPLETED());
  }

  toggleTodo(id) {
    this.props.dispatch(Actions.TOGGLE_TODO(id));
  }

  showControls() {
    this.setState({
      showControls : !this.state.showControls
    });

    setTimeout(() => {
      if (this.lastSelectedTab && !this.state.showControls) {
        this.afterChange(this.lastSelectedTab);
      }
    }, 60);
  }

  compileItem(i, n) {
    let itemCls = 'items_list--item';
    itemCls += i.completed === true ? ' completed'  : '';

    return (
      <div key={i.title+n} className={itemCls}>
       <div className="items_list--item--checkbox" onClick={this.toggleTodo.bind(this, i.id)}>
        {
          i.completed === true ?
            <i className="fa fa-check-square-o" aria-hidden="true"></i>
          : <i className="fa fa-square-o" aria-hidden="true"></i>
        }
       </div>
       <div className="items_list--item--title" onClick={this.setEditable.bind(this, i)}>
        {i.title}
       </div>
       <div className="items_list--item--sp"></div>
      </div>
    )
  }

  componentDidMount() {
    const allItems = document.getElementById('items-all');
    const completeItems = document.getElementById('items-complete');
    const incompleteItems = document.getElementById('items-incomplete');

    this.scrolls = [
      new IScroll(allItems, this.scrollOptions),
      new IScroll(completeItems, this.scrollOptions),
      new IScroll(incompleteItems, this.scrollOptions),
    ];
  }

  componentDidUpdate() {
    if (this.scrolls) {
      this.scrolls.map(s => s.refresh());
    }
  }

  render() {
    const compileItem = this.compileItem.bind(this);
    let items = {
      all        : this.props.state.map(compileItem),
      complete   : this.props.state.filter(i => i.completed === true).map(compileItem),
      incomplete : this.props.state.filter(i => i.completed === false).map(compileItem)
    }

    if (items.complete.length < 1) {
      items.complete = <h2>No Complete Tasks</h2>;
    }

    if (items.incomplete.length < 1) {
      items.incomplete = <h2>No Icomplete Tasks</h2>;
    }

    if (items.all.length < 1) {
      items.all = <h2>No Tasks</h2>;
    }

    return (
      <div className="items_list">
        <div className="items_list--screen-title">
          <span className="items_list--screen-title--desc">
            <small>{items.incomplete.length || 0} item left</small>
          </span>

          Todo List

          <div className="items_list--screen-title--controls" onClick={this.showControls.bind(this)}>
            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
          </div>
        </div>
        {this.state.showControls === true ?
          <div className="items_list--tabs">
            {this.state.selectedAll === true ?
              <div className="items_list--control" onClick={this.selectAll.bind(this, false)}>
                <i className="fa fa-check-square-o" aria-hidden="true"></i>
                Uncomplete all
              </div>
            :
              <div className="items_list--control" onClick={this.selectAll.bind(this, true)}>
                <i className="fa fa-square-o" aria-hidden="true"></i>
                Complete all
              </div>
            }

            <div className="items_list--control" onClick={this.clearCompleted.bind(this)}>Clear completed</div>
          </div>
        :
        <div className="items_list--tabs">
          <div className="items_list--tab active" onClick={this.slideTo.bind(this, 0)}>
            <small>All</small>
          </div>
          <div className="items_list--tab" onClick={this.slideTo.bind(this, 1)}>
            <small>Active</small>
          </div>
          <div className="items_list--tab" onClick={this.slideTo.bind(this, 2)}>
            <small>Completed</small>
          </div>
        </div>
        }
          <Slider {...this.settings} slickGoTo={this.state.currentSlide}>
            <div className="items_list--screen">
              <div id="items-all" className="items_list--scroll">
                <div>
                  {items.all}
                </div>
              </div>
            </div>
            <div className="items_list--screen">
              <div id="items-incomplete" className="items_list--scroll">
                <div>
                  {items.incomplete}
                </div>
              </div>
            </div>
            <div className="items_list--screen">
              <div id="items-complete" className="items_list--scroll">
                <div>
                  {items.complete}
                </div>
              </div>
            </div>
          </Slider>
          <NewTodo />
          <EditTodo todo={this.state.editable} setEditable={this.setEditable.bind(this)}/>
      </div>
    )
  }
}

export default connect(state => ({state}))(ItemsList);
