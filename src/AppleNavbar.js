import React, { Component } from 'react';

import {Icon} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './AppleNavbar.scss';

export default class AppleNavbar extends Component {
  constructor(props){
      super(props);
      this.state = {
        navMenuBt: false,
        menuIsOpened: false,
        bagIsShowed: true,
        searchInputHasFocus: false,
        quickLinkHintShow: true,
        realBagShow: false,
        navLinkShowed: true,
        fsSearchShowed: false,
        isBagBt:true
      }

      let initState = Object.assign({},this.state);

      window.addEventListener('resize',(e)=>{
          if(window.innerWidth>767){
              this.refs.fsSearchInput.value = '';
              this.refs.fsSearchInput.blur();
              this.setState({...initState,realBagShow: this.state.realBagShow});
          }
      });

      document.addEventListener('click',(e)=>{
          if(this.state.isBagBt){
                this.callIfNot(e,['bagbt','realBag'],()=>{
                      this.setState({realBagShow:false});
                });
          }else{
                this.callIfNot(e,['searchBox','quickLink','bagbt'],()=>{
                      this.refs.fsSearchInput.value = '';
                      this.setState({
                          navLinkShowed:true,
                          fsSearchShowed: false,
                          isBagBt: true
                      });
                });
                
          }
      });
  }

  componentDidMount(){
    //[].slice.call(document.querySelectorAll('a')).map((v)=>{
      //console.log(v);
          //v.setAttribute('disabled',true);
    //});
  }

  callIfNot(event,strs,callback){
        let p = event.target;
        let res = false;
        while( p!==null ){
            if((new RegExp(strs.join('|'),'g')).test(p.className)){
                res = true;
                break;
            }
            p = p.parentElement;
        }
        if( res===false ){
           callback();
        }
  }

  menuBtHandle(e){
      this.setState({
          navMenuBt:!this.state.navMenuBt,
          menuIsOpened: !this.state.menuIsOpened,
          bagIsShowed: !this.state.bagIsShowed
      });
  }

  searchFocusHandle(e){
      this.setState({searchInputHasFocus:true});
  }

  searchInputHandle(e){
      if(e.target.value.length > 0){
            this.setState({quickLinkHintShow:false});
            document.querySelector(".resetIcon").style.opacity = 1;
      }else{
            this.setState({quickLinkHintShow:true});
            document.querySelector(".resetIcon").style.opacity = 0;
      }
  }

  searchBoxCancel(e){
      this.setState({searchInputHasFocus:false});
  }

  bagClickHandle(e){
      if(this.state.isBagBt){
          this.setState({realBagShow: !this.state.realBagShow});
      }else{
          //when fsSearchBox disappeared.
          this.refs.fsSearchInput.value = '';

          this.setState({
            navLinkShowed:true,
            fsSearchShowed: false,
            isBagBt: true
          });
      }
  }
  

  desktopSearch(e){
        this.refs.fsSearchInput.focus();
        this.setState({
          navLinkShowed: false,
          fsSearchShowed: true,
          isBagBt: false
        });
  }


  render() {
    return (
      <div>
          <div ref='nav' className={'nav '+(this.state.menuIsOpened?'bg-black ':'bg-gray ') +(this.state.searchInputHasFocus?'search-quicklink-show ':'search-quicklink-hidden')}>
              <ul className={this.state.navLinkShowed? 'navLinkShow':'navLinkDisappear'}>
                  <li><a href='#'><span></span></a></li>
                  <li><a href='#'><span>Mac</span></a></li>
                  <li><a href='#'><span>iPad</span></a></li>
                  <li><a href='#'><span>iPhone</span></a></li>
                  <li><a href='#'><span>Watch</span></a></li>
                  <li><a href='#'><span>Music</span></a></li>
                  <li><a href='#'><span>고객지원</span></a></li>
                  <li onClick={(e)=>{ this.desktopSearch(e) }}><a><span></span></a></li>
                  <li className={'bagbt'} onClick={(e)=>{ this.bagClickHandle(e) }}>
                      <a><span><span></span></span></a>
                  </li>
              </ul>
              <ul>
                  <li><a href='#'><span className={this.state.navMenuBt?'navMenuBt':''} onClick={(e)=>{this.menuBtHandle(e)}}></span></a></li>
                  <li><a href='#'><span></span></a></li>
                  <li className={'bagbt ' + (this.state.bagIsShowed?'show-bag':'hide-bag')} onClick={(e)=>{ this.bagClickHandle(e) }}><a href='#'><span></span></a></li>
              </ul>
              <div className={"navSearch "+(this.state.menuIsOpened?'menu-opening':'menu-closing')}>
                        <div className="navSearchView">
                            <div className="navSearchViewWrapper">
                                <div className="navSearchViewWrapperInput">
                                    <div className="inputBox">
                                      <span className='searchIcon'></span>
                                      <span className='inputSpan'>
                                        <input type='text' placeholder='apple.com 검색' onFocus={(e)=>{this.searchFocusHandle(e)}} onChange={(e)=>{this.searchInputHandle(e)}}/>
                                      </span>
                                      <span className="resetIcon" onClick={ (e)=>{ document.querySelector('.inputSpan>input').value='';this.setState({quickLinkHintShow: true}); e.target.style.opacity=0; } }></span>
                                    </div>
                                    <div className='cancel' onClick={(e)=>{this.searchBoxCancel(e)}}>취소</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="navOpenedMenu">
                            <ul>
                                <li><a href='#'><span>Mac</span></a></li>
                                <li><a href='#'><span>iPad</span></a></li>
                                <li><a href='#'><span>iPhone</span></a></li>
                                <li><a href='#'><span>Watch</span></a></li>
                                <li><a href='#'><span>Music</span></a></li>
                                <li><a href='#'><span>고객지원</span></a></li>
                            </ul>
                            
                                <ul style={this.state.quickLinkHintShow?{visibility:'visible'}:{visibility:'collapse'}}>
                                    <h3 style={{fontSize:'10px',color:'#999',margin:'13px 0px 4px'}}>빠른 링크</h3>
                                    <li><a href='#'><span>매장 찾기</span></a></li>
                                    <li><a href='#'><span>Today at Apple</span></a></li>
                                    <li><a href='#'><span>엑세서리</span></a></li>
                                    <li><a href='#'><span>AirPods</span></a></li>
                                    <li><a href='#'><span>iPod</span></a></li>
                                </ul>
                        </div>
              </div>

              <div className={"fsSearch " + (this.state.fsSearchShowed?'fsSearchShowed':'fsSearchHidden')}>
                  <div className="searchBox">
                      <div className="searchBoxWrapper">
                          <span></span>
                          <span>
                            <input type='text' placeholder='apple.com 검색' ref='fsSearchInput'/>
                          </span>
                      </div>
                  </div>
                  <div className="quickLink">
                      <div className="quickLinkWrapper">
                          <h3 style={{fontSize:'10px',color:'#999',margin:'13px 0px 4px'}}>빠른 링크</h3>
                          <ul>
                                <li><a href='#'><span>매장 찾기</span></a></li>
                                <li><a href='#'><span>Today at Apple</span></a></li>
                                <li><a href='#'><span>액세서리</span></a></li>
                                <li><a href='#'><span>AirPods</span></a></li>
                                <li><a href='#'><span>iPod</span></a></li>
                          </ul>
                      </div>
                  </div>
              </div>

          </div>

          <div className={"realBag "+ (this.state.realBagShow?'realBagShowed':'realBagHidden') }>
                    <div className="bagWrapper">
                          <p>장바구니가 비어 있습니다</p>
                          <ul>
                                <li><a href='#'>장바구니</a></li>
                                <li><a href='#'>즐겨찾기</a></li>
                                <li><a href='#'>주문</a></li>
                                <li><a href='#'>계정</a></li>
                                <li><a href='#'>로그인</a></li>
                          </ul>
                    </div>
         </div>

            <div className="mainBody">
                { this.props.children }
            </div>

      </div>
    );
  }
}


