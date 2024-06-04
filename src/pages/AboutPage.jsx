import "../styles/About.css"

export default function AboutPage() {
    return (
        <div id="aboutPageContainer">
            <div id="aboutContentsContainer">
                <h1 id="aboutTitle">About Snack Mate</h1>
                <img src="./about.jpg" alt="Diverse group cooking"/>
                <h2 className="subTitle">Welcome to Snack Mate!</h2>
                <p>We are delighted to invite you into the world of culinary exploration powered by artificial intelligence. Founded in 2024, Snack Mate was born out of a passion for making cooking accessible, fun, and infinitely creative.</p>
                
                <h2 className="subTitle">Our Vision</h2>
                <p>Our vision is to simplify the cooking process and make it a joyous activity for everyone, whether you're a beginner or a seasoned chef. We believe that with the right tools, everyone can cook delicious meals at home. Snack Mate aims to provide these tools through a user-friendly platform that inspires creativity and eliminates the guesswork in cooking.</p>
                
                <h2 className="subTitle">How It Works</h2>
                <p>At the heart of Snack Mate is a cutting-edge AI algorithm developed by a team of food enthusiasts and technology experts. Our platform uses this technology to generate customized recipes based on ingredients you have at hand or dishes you dream of trying out. Simply enter a dish name or select your available ingredients, and let our AI suggest recipes that are not only tailored to your taste but also easy to follow.</p>
                
                <h2 className="subTitle">Why Choose Us?</h2>
                <ul>
                    <li><strong>Personalized Cooking Experience:</strong> Every recipe suggestion is tailored to meet your dietary preferences and ingredient availability.</li>
                    <li><strong>Ease of Use:</strong> Our interface is designed to be intuitive and user-friendly, ensuring that you can find or create recipes in just a few clicks.</li>
                    <li><strong>Innovative Recipes:</strong> Get access to unique recipes that you won't find anywhere else, created by our AI based on culinary principles and creative combinations.</li>
                </ul>
                
                <h2 className="subTitle">Meet the Team</h2>
                <p>Snack Mate is the brainchild of Esther, a professional chef turned tech entrepreneur, alongside a vibrant team of software developers, designers, and culinary experts. Each team member brings a unique set of skills and a shared passion for revolutionizing the way we cook and eat.</p>
                
                <h2 className="subTitle">Join Our Community</h2>
                <p>We invite you to join our community of food lovers and home cooks who are discovering the joy of cooking with Snack Mate. Share your creations, get tips from other users, and never run out of recipe ideas again.</p>
                
                <p>Thank you for choosing Snack Mate — where your kitchen adventure begins!</p>
            </div>
        </div>
    );
}