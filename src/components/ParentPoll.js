import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DonutChart from 'react-donut-chart';
import { Row, Col, ButtonToolbar, Button } from 'react-bootstrap';
import { updateVote } from "../actions/pollActions";
import '../css/ParentPoll.css';

class ParentPoll extends Component {
    constructor() {
        super();

        this.state = {
            data: [],
            canVote: true
        };
    }

    componentDidMount() {
        const { pollInformation } = this.props;

        this.setState({
            data: pollInformation.answer.options.map(labels => {
                return {
                    id: labels.id,
                    labelName: labels.label,
                    voteCount: 0
                }
            })
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.totalVotes !== nextProps.totalVotes) {
            const updatedData = this.state.data.map(data => {
                if (data.id === nextProps.latestVote) {
                    if (nextProps.votedFor.includes(data.id)) {
                        data.voteCount++;
                    } else {
                        data.voteCount--;
                    }
                }

                return data;
            });

            this.setState({
                data: updatedData,
                canVote: this.props.pollInformation.answer.type === 'Multi'
            });
        }
    }

    handleClick(id) {
        if (this.state.canVote) {
            this.props.updateVote({
                id: id,
                voteType: this.props.pollInformation.answer.type
            });
        }
    }

    static convertUnixTimestamp(timestamp) {
        const months = new Array(12);
        months[0] = "January";
        months[1] = "February";
        months[2] = "March";
        months[3] = "April";
        months[4] = "May";
        months[5] = "June";
        months[6] = "July";
        months[7] = "August";
        months[8] = "September";
        months[9] = "October";
        months[10] = "November";
        months[11] = "December";

        const date = new Date(timestamp * 1000);
        return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
    }

    render() {
        const { pollInformation, totalVotes }  = this.props;

        const answerButtons = pollInformation.answer.options.map((options, index) => {
            return (
                <ButtonToolbar key={index}>
                    <Button className="options-button" onClick={this.handleClick.bind(this, options.id)}>
                        {options.label}
                    </Button>
                </ButtonToolbar>
            );
        });

        const data = this.state.data.map(individualLabel => {
           return {
               label: individualLabel.labelName,
               value: parseInt((individualLabel.voteCount / this.props.totalVotes) * 100, 10)
           }
        });

        return (
            <Row className="parent-poll-container">
                <Col xs={12} md={8} className="poll-question">
                    <h1>Today's Poll</h1>

                    <div className="title-and-date-container">
                        <p>{pollInformation.title}</p>
                        <span>{ParentPoll.convertUnixTimestamp(pollInformation.publishedDate)}</span>
                    </div>

                    {pollInformation.answer.options.length > 0 ? answerButtons: ''}

                    <p id='number-of-votes'>Total number of votes recorded: {totalVotes}</p>
                </Col>

                <Col x={12} md={4} className="donut-chart">
                    <DonutChart
                        innerRadius={0.2}
                        height={500}
                        width={500}
                        data={totalVotes === 0 || totalVotes === null ? [] : data}
                    />
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => ({
    totalVotes: state.poll.totalVotes,
    votedFor: state.poll.votedFor,
    latestVote: state.poll.latestVote
});

const mapDispatchToProps = dispatch => ({
    updateVote: bindActionCreators(updateVote, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ParentPoll);