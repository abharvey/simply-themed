#themed-breakpoints

I built this out of dissatisfaction with other responsive design styled libraries.

The single letter shorthand that's common in many of today's libraries tend to require library syntax understanding
and do not read declaritvely enough to grasp all the important css in a instance.

Styled-Components (SC), and Emotion, both do a great job using template literals to improve the readability of auto generated 
css classes while writing CSS-in-JS. I wanted to maintain that readability while simultaniously implementing a common
responsive design system. Using similar techniques to the template literal processing to generate the classes in SC & Emotion I 
decided to use a JSON structure to define the system of responsive CSS allowing a developer to only understand their own Theme
definition and standard CSS-in-JS without extra mental mapping of array variable short hands used in other responsive libraries
