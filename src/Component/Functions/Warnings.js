import React from 'react';
//
const FirstWarning = () => (
  <div>
    Hey. What's going on here? You know better than this - so no more
    moderations huh?
  </div>
);

const SecondWarning = () => (
  <div>
    Again? This is your second warning.
    {`Think about because next time you're off DiGii and you're going to have to
      watch a tutorial to get back on. `}
    <div>Know better and be better!</div>
  </div>
);

const ThirdWarning = () => (
  <div>
    Oh no! That's it - you're outta here. Watch the tutorial, answer the
    questions and clean up your act before getting back onto DiGii.
    <div>You can do it!</div>
  </div>
);

const warningList = [<FirstWarning />, <SecondWarning />, <ThirdWarning />];

const Warnings = ({ index }) => warningList[index];
// const Warnings = [
//   'Hey! What\'s going on here? You know better than this - so no more moderations huh?',
//   'Again? This is your second warning. Think about because next time you\'re off DiGii  and you\'re going to have to watch a tutorial to get back on. Know better and be better!</div>',
//   'Oh no! That\'s it - you\'re outta here. Watch the tutorial, answer the questions and clean up your act before getting back onto DiGii. You can do it! '
// ];
export default Warnings;
