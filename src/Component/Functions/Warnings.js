import React from 'react';

const FirstWarning = () => (
  <div>
    <div>Hey</div>
    <div>What's going on here?</div>
    <div>You know better than this - so no more moderations huh?</div>
  </div>
);

const SecondWarning = () => (
  <div>
    <div>Again?</div>
    <div>This is your second warning.</div>
    <div>
      {`Think about because next time you're off DiGii and you're going to have to
      watch a tutorial to get back on. Know better and be better!`}
    </div>
  </div>
);

const ThirdWarning = () => (
  <div>
    <div>Oh no!</div>
    <div>That's it - you're outta here.</div>
    <div>
      Watch the tutorial, answer the questions and clean up your act before
      getting back onto DiGii.
    </div>
    <div>You can do it!</div>
  </div>
);
// const Warnings = [
//   'Hey! What\'s going on here? You know better than this - so no more moderations huh?',
//   'Again? This is your second warning. Think about because next time you\'re off DiGii  and you\'re going to have to watch a tutorial to get back on. Know better and be better!</div>',
//   'Oh no! That\'s it - you\'re outta here. Watch the tutorial, answer the questions and clean up your act before getting back onto DiGii. You can do it! '
// ];

const warningList = [<FirstWarning />, <SecondWarning />, <ThirdWarning />];

const Warnings = ({ index }) => {
  console.log('>>>>>>>>>>>>>>>>>>>>>check', index);
  return warningList[index];
};
export default Warnings;
