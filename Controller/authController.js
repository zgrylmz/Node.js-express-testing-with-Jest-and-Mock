const jwt = require("jsonwebtoken");

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  // basit bir örnek: şifre sabit
  if (email === "admin@test.com" && password === "123456") {
    const token = jwt.sign({ email }, "gizliAnahtar", { expiresIn: "1h" });
    return res.json({ token });
  }

  res.status(401).json({ error: "Invalid credentials" });
};

module.exports.getToken = async(req,res)=>{
      const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "gizliAnahtar");
    res.status(200).json({ message: "Access granted", email: decoded.email });
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
}
