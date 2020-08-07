import React from 'react';
import './About.css'
import { Card } from 'react-bootstrap';

export default function About() {
    return (
        <div className="ContentBody">
            <div className="About">
                <Card style={{padding: 30}}>
                    <p>As of August 2020, </p>
                    <p>85% of employees work from home,</p>
                    <p>5% of companies are fully remote,</p>
                    <p>99% of gamers have a home setup,</p>
                    <p>and 75% of students attend school remote.</p>
                    <p><b>100% of the above statements are complete guesses</b>, but I'd imagine its somewhat close to reality. Don't quote me.</p>
                    <hr />
                    <p>Point is, we are spending a lot of time at our desks these days.</p>
                    <p>There are many reasons to optimize our desk setup - health/ergonomics, productivity, performance, to name a few.</p>
                    <p>While there are thousands of sites that give product recommendations, they're not as genuine as hearing
                    about a product from your friend, or from somone who has actually used the product for a while.</p>
                    <hr />
                    <p>Any concerns/questions can be directed to me at caimjonathan@gmail.com <span role="img" aria-label="laughing-emoji">👋</span></p>
                    <p>For more about me, visit <a href="https://jonathancai.com/">jonathancai.com</a>.</p>
                    <p>The code is on Github: <a href="https://github.com/jonathancai11/yourdesk-graphql">backend</a>
                    &nbsp;and <a href="https://github.com/jonathancai11/yourdesk-react">frontend</a>.</p>
                    <p>Home page graphic is from <a href="https://www.vecteezy.com/free-vector/man-computer">Man Computer Vectors by Vecteezy</a>.</p>
                </Card>
            </div>
        </div>
    );
}