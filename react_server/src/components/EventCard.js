import React, { Component } from 'react';

export default class EventCard extends Component {

  componentDidMount() {
    var eventCard = document.getElementById(this.props.id);
    eventCard.addEventListener('mouseenter', function() {
      this.props.handleEventCardMouseEnter(this.props.id);
    }.bind(this))
  }

  buildCalendarUrl(event) {
    var url = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=";
    url += this.props.title;
    url += '&dates='
    url += this.formatDateForCalendarUrl(this.props.start_time);
    url += '/'
    if (this.props.stop_time) {
      url += this.formatDateForCalendarUrl(this.props.stop_time);
    }
    url += '&details=';
    url += this.props.description;
    url += "&location=";
    url += this.props.venue_address;
    return url;
  }

  formatDateForCalendarUrl(dateTime) {
    if (dateTime) {
      dateTime = dateTime.split(' ');
      dateTime[0] = dateTime[0].split('-').join('');
      dateTime[1] = dateTime[1].split(':').join('');
      dateTime = dateTime[0] + 'T' + dateTime[1] + 'Z';
      return dateTime;
    }
  }

  formatDateForDisplay(startTime, endTime) {
      var formattedDate = new Date(startTime);
      if (formattedDate.getHours() >= 12) {
        var hours = formattedDate.getHours() - 12 || 12;
        return (hours + "pm " + formattedDate.toString().slice(0,16));
      } else {

        var hours = formattedDate.getHours();
        if (hours === 0) {
          return "All Day"
        }
        return (hours + "am " + formattedDate.toString().slice(0,16));
      }
    }

  render() {
    return (
      // Removed 1/3 width bulma class
      // TODO : Jazz it up with bulma css.
      <div id={this.props.id} /*onClick={(e) => { e.stopPropagation(); this.props.onEventCardClick(this.props.id)} }*/>
        <div className="box1">
          <div className="box space_edit2">
            <article className="media">
              <div className="media-left">
                <figure className="image is-64x64">
                  <img src={this.props.image_url} alt="Image"/>
                </figure>
              </div>
              <div className="media-content" onClick={(e) => { e.stopPropagation(); this.props.onEventCardClick(this.props.id)}}>
                <div className="content">
                  <p>
                    <strong>{this.props.title}</strong>
                    <br />
                    <em>{this.props.venue_name}</em>
                    <br />
                    <em>{this.formatDateForDisplay(this.props.start_time, this.props.stop_time)}</em>
                    <br />
                    <em>{this.props.venue_address}</em>
                    <br />
                    <br />
                    {this.props.description}
                    <br />
                  </p>

                  <nav className="level">
                    <div className="level-left">
                      <a className="level-item" href= {this.buildCalendarUrl()} target='_blank' >
                        <span className="icon is-small"><i className="fa fa-calendar"></i></span>
                      </a>
                      <a className="level-item">
                        <span className="icon is-small"><i className="fa fa-ticket"></i></span>
                      </a>
                      <a className="level-item">
                        <span className="icon is-small"><i className="fa fa-facebook"></i></span>
                      </a>
                    </div>
                  </nav>
                  
                  
                </div>

              </div>
              <div className="media-right">
                <button className="delete" onClick={()=>this.props.deselectEvent(this.props.id)}>x</button>
              </div>
            </article>
          </div>
        </div>

      </div>

      // {"https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + this.props.title +  "&dates=" + this.props.start_time + "&details=For+details,+link+here:+http://www.example.com&location=Waldorf+Astoria,+301+Park+Ave+,+New+York,+NY+10022&sf=true&output=xml#eventpage_6"}

      

      //calendar.google.com/calendar/render?action=TEMPLATE&text=Your+Event+Name&dates=20140127T224000Z/20140320T221500Z&details=For+details,+link+here:+http://www.example.com&location=Waldorf+Astoria,+301+Park+Ave+,+New+York,+NY+10022&sf=true&output=xml#eventpage_6
  

    );
  }
}  