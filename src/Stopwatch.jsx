import React, { Component } from 'react';
import './Stopwatch.css';

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    
    // تهيئة الحالة
    this.state = {
      elapsedTime: 0,
      isRunning: false,
      laps: [],
      startTime: 0,
      lastLapTime: 0
    };
    
    // ربط الدوال مع this
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.recordLap = this.recordLap.bind(this);
    this.formatTime = this.formatTime.bind(this);
  }
  
  componentDidMount() {
    // تنظيف المؤقت عند إزالة المكون
    this.timer = null;
  }
  
  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  
  startTimer() {
    if (!this.state.isRunning) {
      const startTime = Date.now() - this.state.elapsedTime;
      this.setState({
        isRunning: true,
        startTime: startTime,
        lastLapTime: this.state.elapsedTime
      });
      
      // تحديث المؤقت كل 10 مللي ثانية
      this.timer = setInterval(() => {
        this.setState({
          elapsedTime: Date.now() - startTime
        });
      }, 10);
    }
  }
  
  stopTimer() {
    if (this.state.isRunning) {
      clearInterval(this.timer);
      this.setState({
        isRunning: false
      });
    }
  }
  
  resetTimer() {
    clearInterval(this.timer);
    this.setState({
      elapsedTime: 0,
      isRunning: false,
      laps: [],
      startTime: 0,
      lastLapTime: 0
    });
  }
  
  recordLap() {
    if (this.state.isRunning) {
      const currentTime = this.state.elapsedTime;
      const lapTime = currentTime - this.state.lastLapTime;
      
      this.setState(prevState => ({
        laps: [{ time: lapTime, total: currentTime }, ...prevState.laps],
        lastLapTime: currentTime
      }));
    }
  }
  
  formatTime(milliseconds) {
    // تحويل الوقت إلى تنسيق HH:MM:SS:ms
    const ms = Math.floor(milliseconds % 1000 / 10);
    const seconds = Math.floor(milliseconds / 1000) % 60;
    const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    
    return (
      `${hours.toString().padStart(2, '0')}:` +
      `${minutes.toString().padStart(2, '0')}:` +
      `${seconds.toString().padStart(2, '0')}:` +
      `${ms.toString().padStart(2, '0')}`
    );
  }
  
  render() {
    const { elapsedTime, isRunning, laps } = this.state;
    
    return (
      <div className="stopwatch-container">
        <div className="timer-display">
          {this.formatTime(elapsedTime)}
        </div>
        
        <div className="controls">
          <button 
            className="start-btn" 
            onClick={this.startTimer}
            disabled={isRunning}
          >
            بدء
          </button>
          <button 
            className="stop-btn" 
            onClick={this.stopTimer}
            disabled={!isRunning}
          >
            إيقاف
          </button>
          <button 
            className="lap-btn" 
            onClick={this.recordLap}
            disabled={!isRunning}
          >
            لفة
          </button>
          <button 
            className="reset-btn" 
            onClick={this.resetTimer}
          >
            إعادة ضبط
          </button>
        </div>
        
        <div className="laps-section">
          <h2 className="laps-title">اللفات المسجلة</h2>
          {laps.length > 0 ? (
            <ol className="laps-list">
              {laps.map((lap, index) => (
                <li key={index} className="lap-item">
                  <span className="lap-number">اللفة {laps.length - index}</span>
                  <span className="lap-time">{this.formatTime(lap.time)}</span>
                  <span className="lap-total">({this.formatTime(lap.total)})</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="no-laps">لم يتم تسجيل أي لفات بعد</p>
          )}
        </div>
      </div>
    );
  }
}

export default Stopwatch;