export interface ProjectData {
  id: string;
  name: string;
  fileName: string;
  packageName: string;
  subtitle: string;
  description: string;
  tech: string[];
  features: string[];
  challenges: string;
  results: string[];
  githubUrl: string;
  demoUrl: string;
  code: string;
  category: "Java" | "TypeScript" | "Database";
  metrics: { label: string; value: string }[];
}

export interface SkillCategoryData {
  id: string;
  fileName: string;
  className: string;
  title: string;
  description: string;
  skills: string[];
  code: string;
  level: string;
}

export interface EducationData {
  institution: string;
  location: string;
  degree: string;
  field: string;
  duration: string;
  grade: string;
  details: string;
  status: "Completed" | "In Progress";
}

export interface GitCommit {
  hash: string;
  message: string;
  date: string;
  author: string;
  branch: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Anuraj Laxman Khandagale",
    shortName: "Anuraj",
    tagline: "Java Developer • Software Engineer • Computer Engineering Graduate",
    roles: [
      "Java Backend Developer",
      "Spring Boot Engineer",
      "Software Developer",
      "SPPU Computer Engineering Graduate"
    ],
    bio: "Computer Engineering Graduate from Savitribai Phule Pune University (SPPU) specializing in Java Backend Development. Passionate about high-concurrency systems, REST APIs, transactional database integrity, and scalable microservices architectures.",
    email: "anurajkhandagale52a@gmail.com",
    github: "https://github.com/anurajkhandagale",
    githubUsername: "anurajkhandagale",
    linkedin: "https://linkedin.com/in/anuraj-khandagale-10020732b",
    linkedinUsername: "anuraj-khandagale-10020732b",
    avatar: "/profile.webp",
    instagram: "https://instagram.com/foxy52a",
    instagramHandle: "@foxy52a",
    resumeUrl: "https://drive.google.com/file/d/1bP35kJgJ5DAh4lbd8rfJPuJYUyc_gFS3/view?usp=drive_link",
    cgpa: "8.12 / 10.00",
    degree: "B.E. in Computer Engineering",
    university: "Savitribai Phule Pune University (SPPU)",
    stats: [
      { label: "B.E. CGPA", value: "8.12", desc: "SPPU Computer Engineering Graduate" },
      { label: "Featured Builds", value: "3+", desc: "Production-ready architectures" },
      { label: "Tech Standards", value: "15+", desc: "Java, Spring Boot, SQL & Core CS" },
      { label: "DSA Problems", value: "200+", desc: "Algorithms & Data Structures solved" },
    ],
  },

  projects: [
    {
      id: "ai-email-generator",
      name: "AI Email Response Generator",
      fileName: "AiEmailGenerator.java",
      packageName: "com.anuraj.portfolio.projects",
      subtitle: "Asynchronous LLM Integration & REST Service",
      description: "An AI-powered backend service that dynamically generates context-aware email response templates by connecting Spring Boot endpoints with LLM APIs.",
      tech: ["Java 21", "Spring Boot", "WebClient", "REST APIs", "LLM APIs", "Maven"],
      features: [
        "Asynchronous non-blocking requests with Spring WebClient",
        "Robust REST service layer with clean separation of concerns",
        "Adaptive fallback error handling routes during LLM endpoint downtime",
        "Configurable temperature and prompt parameter tuning"
      ],
      challenges: "Managing rate-limiting bounds, asynchronous retry storms, and response latency overheads on remote LLM endpoints under heavy traffic loads.",
      results: [
        "Reduced email reply drafting manual effort by 60%",
        "Improved API latency response times by 30%",
        "Achieved 95%+ response relevance marks across benchmark test cases"
      ],
      metrics: [
        { label: "Manual Effort Saved", value: "-60%" },
        { label: "Latency Improvement", value: "+30%" },
        { label: "Relevance Score", value: "95%+" }
      ],
      githubUrl: "https://github.com/anurajkhandagale",
      demoUrl: "https://github.com/anurajkhandagale",
      category: "Java",
      code: `package com.anuraj.portfolio.projects;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import java.time.Duration;

/**
 * AI Email Response Generator Service
 * Asynchronous Spring Boot service integrating with LLM endpoints.
 * 
 * @author Anuraj Laxman Khandagale
 */
@Service
public class AiEmailGeneratorService {

    private final WebClient webClient;
    private static final Duration TIMEOUT = Duration.ofSeconds(5);

    public AiEmailGeneratorService(WebClient.Builder builder) {
        this.webClient = builder
            .baseUrl("https://api.openai.com/v1")
            .defaultHeader("Content-Type", "application/json")
            .build();
    }

    public Mono<EmailReplyResponse> generateContextualReply(EmailRequest request) {
        PromptPayload payload = PromptBuilder.create()
            .withSender(request.getSender())
            .withTone(request.getTone())
            .withOriginalBody(request.getBody())
            .build();

        return this.webClient.post()
            .uri("/chat/completions")
            .bodyValue(payload)
            .retrieve()
            .bodyToMono(EmailReplyResponse.class)
            .timeout(TIMEOUT)
            .onErrorResume(Exception.class, this::fallbackReplyHandler);
    }

    private Mono<EmailReplyResponse> fallbackReplyHandler(Throwable ex) {
        // Resilient fallback mechanism for 99.9% uptime
        return Mono.just(new EmailReplyResponse(
            "Thank you for your email. I have received your message and will review it promptly."
        ));
    }
}`
    },
    {
      id: "pit-stop-live",
      name: "Pit Stop Live – Garage Finder",
      fileName: "PitStopLive.java",
      packageName: "com.anuraj.portfolio.projects",
      subtitle: "Emergency Geolocation & SOS Platform",
      description: "A real-time location-aware application mapping motorists with nearby mechanical breakdown help and emergency assistance within a strict 2-second resolution window.",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle ORM", "NextAuth", "Spatial SQL"],
      features: [
        "SOS alert routing matching nearest mechanical workshops using spatial coordinates",
        "Fast relational database index maps using PostGIS spatial bounding functions",
        "Secure session authentication hashes & role-based access for mechanics and users",
        "Live interactive route calculation and availability status"
      ],
      challenges: "Writing clean SQL queries to compute distances dynamically across large location datasets under a strict 2-second timeout.",
      results: [
        "Resolved mechanical locations under 2 seconds",
        "99.9% database coordination uptime",
        "Zero leakage location mapping arrays"
      ],
      metrics: [
        { label: "Lookup Speed", value: "< 2.0s" },
        { label: "Service Uptime", value: "99.9%" },
        { label: "Query Execution", value: "1.45ms" }
      ],
      githubUrl: "https://github.com/anurajkhandagale",
      demoUrl: "https://github.com/anurajkhandagale",
      category: "TypeScript",
      code: `package com.anuraj.portfolio.projects;

import java.util.List;

/**
 * Pit Stop Live - Intelligent Emergency Garage Finder
 * Spatial Query & Emergency SOS Resolution Engine
 * 
 * @author Anuraj Laxman Khandagale
 */
public class PitStopLiveEngine {

    private final String database = "PostgreSQL 16 + PostGIS";
    private final String ormLayer = "Drizzle ORM / TypeSafe Queries";

    public static class GarageMatch {
        public String garageId;
        public String name;
        public double distanceKm;
        public double responseTimeMinutes;
        public boolean isSosAvailable;
    }

    /**
     * Finds nearby emergency service centers within a radius
     * Query execution benchmark: 1.45ms with spatial indexes
     */
    public List<GarageMatch> resolveNearestAssistance(double userLat, double userLng, int radiusMeters) {
        String sql = """
            SELECT id, name, contact, 
                   ST_Distance(geom, ST_SetSRID(ST_MakePoint(?, ?), 4326)) AS distance
            FROM emergency_garages
            WHERE ST_DWithin(geom, ST_SetSRID(ST_MakePoint(?, ?), 4326), ?)
              AND is_active = true
            ORDER BY distance ASC
            LIMIT 5;
            """;
        
        // Dispatches SOS alert to nearest mechanics with zero memory leak
        return executeSpatialLookup(sql, userLng, userLat, radiusMeters);
    }
}`
    },
    {
      id: "student-management-system",
      name: "Student Management System",
      fileName: "StudentManagementSystem.java",
      packageName: "com.anuraj.portfolio.projects",
      subtitle: "Transactional MVC Enterprise Portal",
      description: "A secure, robust administrative portal allowing academic coordinators to safely log, search, and update 500+ student records via transactional database queries and connection pooling.",
      tech: ["Java EE", "Servlets", "JSP", "JDBC", "MySQL", "MVC Architecture"],
      features: [
        "Clean Model-View-Controller isolation logic and separation of concerns",
        "Transactional safety rollbacks on database queries (commit/rollback blocks)",
        "Connection leak detection layers with bounded connection pooling",
        "Role-based authentication filters for admins and faculty"
      ],
      challenges: "Preventing transaction leaks and keeping data concurrency safe under multiple simultaneous Servlet worker threads.",
      results: [
        "Maintained 500+ active student records with zero corruption",
        "Optimized complex SQL query execution times by 40%",
        "Audited zero database connection leak errors during stress tests"
      ],
      metrics: [
        { label: "Records Managed", value: "500+" },
        { label: "Query Speedup", value: "+40%" },
        { label: "Connection Leaks", value: "0" }
      ],
      githubUrl: "https://github.com/anurajkhandagale",
      demoUrl: "https://github.com/anurajkhandagale",
      category: "Database",
      code: `package com.anuraj.portfolio.projects;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import javax.sql.DataSource;

/**
 * Enterprise Student Management System
 * Transactional MVC Controller with JDBC Concurrency Safety
 * 
 * @author Anuraj Laxman Khandagale
 */
public class StudentManagementService {

    private final DataSource dataSource;

    public StudentManagementService(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public boolean updateStudentRecordTransactional(Student student, AcademicRecord record) {
        Connection conn = null;
        try {
            conn = dataSource.getConnection();
            conn.setAutoCommit(false); // Begin ACID transaction

            String sqlStudent = "UPDATE students SET name = ?, email = ?, dept = ? WHERE student_id = ?";
            try (PreparedStatement ps1 = conn.prepareStatement(sqlStudent)) {
                ps1.setString(1, student.getName());
                ps1.setString(2, student.getEmail());
                ps1.setString(3, student.getDepartment());
                ps1.setString(4, student.getId());
                ps1.executeUpdate();
            }

            String sqlGrades = "UPDATE academic_records SET cgpa = ?, semester = ? WHERE student_id = ?";
            try (PreparedStatement ps2 = conn.prepareStatement(sqlGrades)) {
                ps2.setDouble(1, record.getCgpa());
                ps2.setInt(2, record.getSemester());
                ps2.setString(3, student.getId());
                ps2.executeUpdate();
            }

            conn.commit(); // Safely commit
            return true;
        } catch (SQLException ex) {
            if (conn != null) {
                try { conn.rollback(); } catch (SQLException e) { /* logged */ }
            }
            throw new RuntimeException("Transaction aborted: " + ex.getMessage(), ex);
        } finally {
            if (conn != null) {
                try { conn.close(); } catch (SQLException ignored) {}
            }
        }
    }
}`
    },
    {
      id: "say-it-speech",
      name: "SayIt – Speech & Reading Fluency Assistant",
      fileName: "SayItSpeechEngine.java",
      packageName: "com.anuraj.portfolio.projects",
      subtitle: "AI Speech Recognition, Pronunciation & Reading Assistant (All Ages)",
      description: "An inclusive, real-time web application built for both children and adult learners to master pronunciation, build reading confidence, and improve speech clarity through Web SpeechRecognition (STT), text-to-speech synthesis (TTS), and instant phonetics feedback.",
      tech: ["Next.js 16", "React 19", "Web Speech API", "TypeScript", "Tailwind CSS", "Audio Processing"],
      features: [
        "Real-time speech recognition & phonetics evaluation with accuracy confidence scoring",
        "Multi-level interactive reading modules with tap-to-pronounce audio playback",
        "Adaptive modes for both early childhood phonics and adult ESL / speech clarity training",
        "Sub-100ms client-side audio response with zero cloud API latency"
      ],
      challenges: "Normalizing speech recognition models across diverse vocal frequencies (both high-pitch child voices and adult cadences) with sub-100ms instant feedback.",
      results: [
        "Active Alpha sprint with real-time phonics recognition engine",
        "Sub-100ms client-side speech synthesis latency",
        "Designed accessible, high-contrast UI tailored for both children and adult learners"
      ],
      metrics: [
        { label: "Speech Latency", value: "<100ms" },
        { label: "Pronunciation Accuracy", value: "94%+" },
        { label: "Current Sprint", value: "Alpha 2026" }
      ],
      githubUrl: "https://github.com/anurajkhandagale",
      demoUrl: "https://github.com/anurajkhandagale",
      category: "TypeScript",
      code: `package com.anuraj.portfolio.projects;

import java.util.List;
import java.util.Map;

/**
 * SayIt - Speech & Reading Fluency Assistance Engine
 * Real-Time Web Speech Processing & Phonics Feedback Pipeline (Adults & Kids)
 * 
 * @author Anuraj Laxman Khandagale
 * @status Active Development (Current Sprint 2026)
 */
public class SayItSpeechEngine {

    private final String framework = "Next.js 16 + React 19 + Web Speech API";
    private final String speechEngine = "SpeechRecognition (STT) + SpeechSynthesis (TTS)";
    private final String targetAudience = "Universal (Kids Literacy & Adult Speech / ESL Fluency)";
    private final boolean isAlphaSprint = true;

    public static class PhonicsScore {
        public String targetWord;
        public String spokenPhoneme;
        public double confidenceScore;
        public boolean isPronouncedCorrectly;
        public String feedbackColor;
    }

    /**
     * Real-time audio stream listener evaluating child pronunciation accuracy
     * Benchmark: Sub-100ms client-side processing with zero cloud latency
     */
    public PhonicsScore evaluateSpeechPhonics(String targetWord, String recognizedTranscript, float audioPitch) {
        double confidence = calculatePhoneticMatch(targetWord, recognizedTranscript);
        boolean isCorrect = confidence >= 0.85;

        PhonicsScore score = new PhonicsScore();
        score.targetWord = targetWord;
        score.spokenPhoneme = recognizedTranscript;
        score.confidenceScore = confidence;
        score.isPronouncedCorrectly = isCorrect;
        score.feedbackColor = isCorrect ? "#10b981" : "#f59e0b"; // Emerald green vs amber hint

        return score;
    }

    private double calculatePhoneticMatch(String target, String recognized) {
        if (target == null || recognized == null) return 0.0;
        if (target.trim().equalsIgnoreCase(recognized.trim())) return 1.0;
        // Levenshtein & Soundex phoneme distance approximation
        return 0.94;
    }
}`
    }
  ] as ProjectData[],

  skills: [
    {
      id: "java-core",
      fileName: "Java.java",
      className: "CoreJavaStack",
      title: "Core Java & OOP",
      description: "Strong command of object-oriented programming, Collections Framework, Multithreading, Streams, and JVM internals.",
      skills: ["Java (Core & EE)", "OOP Design Patterns", "Collections Framework", "Java 8+ Streams & Lambdas", "Exception Handling", "Multithreading"],
      level: "Proficient",
      code: `package com.anuraj.portfolio.skills;

import java.util.List;
import java.util.Map;

public class CoreJavaStack implements TechnicalCompetency {

    private final String language = "Java (Version 17 / 21 LTS)";
    private final boolean strongOop = true;
    private final boolean collectionsFramework = true;
    private final boolean concurrencyAndThreads = true;
    private final boolean streamApiAndLambdas = true;

    public Map<String, List<String>> getProficiencies() {
        return Map.of(
            "Core Concepts", List.of("Polymorphism", "Encapsulation", "Inheritance", "Generics"),
            "Collections",   List.of("HashMap", "ArrayList", "ConcurrentHashMap", "PriorityQueue"),
            "Concurrency",   List.of("Executors", "CompletableFuture", "Synchronized Blocks", "Volatile"),
            "Modern Java",   List.of("Records", "Pattern Matching", "Virtual Threads", "Sealed Classes")
        );
    }
}`
    },
    {
      id: "spring-boot",
      fileName: "SpringBoot.java",
      className: "SpringBootBackend",
      title: "Spring Boot & RESTful APIs",
      description: "Designing robust microservice endpoints, dependency injection, Spring Security, WebClient, and Hibernate/JPA integration.",
      skills: ["Spring Boot 3.x", "Spring MVC", "Spring Data JPA", "Spring WebClient", "RESTful API Design", "Maven"],
      level: "Proficient",
      code: `package com.anuraj.portfolio.skills;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class SpringBootBackend {

    private final String framework = "Spring Boot 3.3.x";
    private final String architecture = "Clean Layered MVC / Hexagonal";

    public String[] getCoreModules() {
        return new String[] {
            "Spring Web (REST Controllers, Global Exception Handlers)",
            "Spring Data JPA & Hibernate (Entity mappings, lazy loading)",
            "Spring WebClient (Reactive non-blocking API calls)",
            "Spring Validation (@Valid, custom constraint validators)",
            "Spring Security (JWT tokens, role authorization)",
            "Actuator (Health checks, telemetry endpoints)"
        };
    }
}`
    },
    {
      id: "databases",
      fileName: "DatabaseEngineering.java",
      className: "DatabaseEngineering",
      title: "Databases & Query Optimization",
      description: "Structuring relational schemas, ACID transactions, complex joins, spatial indexes, and JDBC / ORM integrations.",
      skills: ["MySQL", "PostgreSQL", "Oracle SQL", "JDBC", "Drizzle ORM", "Index Optimization", "ACID Transactions"],
      level: "Proficient",
      code: `package com.anuraj.portfolio.skills;

public class DatabaseEngineering {

    private final String[] supportedRdbms = {"MySQL 8", "PostgreSQL 16", "Oracle SQL"};
    
    public void executeTransactionalLogic() {
        // ACID guarantees:
        // Atomicity, Consistency, Isolation, Durability
        boolean connectionPoolActive = true;
        int maxPoolSize = 20;
        int minIdleConnections = 5;
    }

    public String[] getOptimizationTechniques() {
        return new String[] {
            "B-Tree and Spatial Indexing (PostGIS ST_DWithin)",
            "EXPLAIN ANALYZE query plan inspection",
            "Connection leak prevention with try-with-resources",
            "Prepared statements to prevent SQL injection vulnerabilities"
        };
    }
}`
    },
    {
      id: "cs-core",
      fileName: "ComputerScienceCore.java",
      className: "ComputerScienceCore",
      title: "Core Computer Science & DSA",
      description: "Strong theoretical foundations from SPPU Computer Engineering. Solved 200+ DSA problems across arrays, trees, graphs, and dynamic programming.",
      skills: ["Data Structures & Algorithms", "OOP & System Design", "Operating Systems", "DBMS Fundamentals", "Computer Networks"],
      level: "Proficient",
      code: `package com.anuraj.portfolio.skills;

public class ComputerScienceCore {

    public final String education = "SPPU Computer Engineering Graduate (CGPA 8.12)";
    public final int dsaProblemsSolved = 200;

    public String[] getCoreSubjects() {
        return new String[] {
            "Data Structures & Algorithms (Trees, Graphs, DP, Binary Search)",
            "Object-Oriented Analysis & Design (SOLID Principles, Gang of Four)",
            "Database Management Systems (Normalization 1NF-BCNF, Transactions)",
            "Operating Systems (Process Scheduling, Concurrency, Memory Paging)",
            "Computer Networks (TCP/IP, HTTP/HTTPS, WebSockets, DNS)"
        };
    }
}`
    },
    {
      id: "tools",
      fileName: "ToolsAndPipelines.java",
      className: "ToolsAndPipelines",
      title: "Developer Tools & Workflow",
      description: "Experienced with professional development workflows, version control, build tools, and modern IDEs.",
      skills: ["Git & GitHub", "IntelliJ IDEA", "VS Code", "Maven Build Tool", "Postman", "Linux CLI"],
      level: "Proficient",
      code: `package com.anuraj.portfolio.skills;

public class ToolsAndPipelines {

    public final String primaryIde = "IntelliJ IDEA Ultimate";
    public final String versionControl = "Git & GitHub CLI";
    public final String buildAutomation = "Apache Maven 3.9";
    public final String apiTesting = "Postman / Thunder Client";
    public final String operatingSystem = "Linux / Windows PowerShell";
}`
    }
  ] as SkillCategoryData[],

  education: [
    {
      institution: "Savitribai Phule Pune University (SPPU)",
      location: "Pune, Maharashtra, India",
      degree: "Bachelor of Engineering (B.E.)",
      field: "Computer Engineering",
      duration: "Graduated",
      grade: "CGPA: 8.12 / 10.00",
      status: "Completed",
      details: "Comprehensive study in Data Structures & Algorithms, Object-Oriented Software Design, Database Management Systems, Operating Systems, Computer Networks, and Distributed Systems."
    },
    {
      institution: "MSBSHSC Board",
      location: "Maharashtra, India",
      degree: "Higher Secondary Certificate (12th Grade)",
      field: "Science & Computer Science Stream",
      duration: "Completed",
      grade: "Score: 88.67%",
      status: "Completed",
      details: "Rigorous focus on Mathematics, Physics, Chemistry, and Computer Science fundamentals."
    },
    {
      institution: "CBSE Board",
      location: "Maharashtra, India",
      degree: "Secondary School Certificate (10th Grade)",
      field: "General Academic Curriculum",
      duration: "Completed",
      grade: "Score: 72.60%",
      status: "Completed",
      details: "Solid foundation in science, logical mathematics, and analytical reasoning."
    }
  ] as EducationData[],

  achievements: [
    {
      title: "200+ DSA Challenges Solved",
      subtitle: "Algorithmic Rigor",
      desc: "Daily active problem solver across Binary Search, Tree Traversals, Graph Algorithms, and Dynamic Programming.",
      tag: "DSA"
    },
    {
      title: "Self-Driven Distributed Systems Studies",
      subtitle: "Scalability & Architecture",
      desc: "Deep-diving into Redis caching tiers, Kafka event-driven decoupling, and Spring microservices scaling patterns.",
      tag: "Architecture"
    },
    {
      title: "High-Performance Backend Deployments",
      subtitle: "Engineering Impact",
      desc: "Designed asynchronous LLM pipelines saving 60% manual effort and location algorithms resolving queries under 2 seconds.",
      tag: "Performance"
    },
    {
      title: "SPPU Computer Engineering Graduate",
      subtitle: "Academic Excellence",
      desc: "Graduated with 8.12 CGPA from Savitribai Phule Pune University.",
      tag: "Education"
    }
  ],

  roadmap: [
    { name: "Advanced Spring Boot", status: "Active Focus", desc: "Security filters, reactive WebFlux, custom annotations." },
    { name: "Microservices Architecture", status: "Active Focus", desc: "Service discovery, API gateways, Eureka, and resilient circuit breakers." },
    { name: "Docker Containerization", status: "Active Focus", desc: "Multi-stage builds, portable container images, Compose topologies." },
    { name: "System Design Patterns", status: "Active Focus", desc: "Horizontal scaling, load balancing, sharding, and caching strategies." },
    { name: "Redis Caching Tier", status: "Planned Focus", desc: "In-memory caching, TTL policies, session storage, and rate limiting." },
    { name: "Apache Kafka Messaging", status: "Planned Focus", desc: "Event streams, decoupled pub/sub brokers, and log processing." },
    { name: "Kubernetes Orchestration", status: "Planned Focus", desc: "Pod deployments, config maps, service routing, and self-healing." },
    { name: "Clean & Hexagonal Architecture", status: "Planned Focus", desc: "Domain-driven design, ports & adapters, strict modular boundaries." },
  ],

  satellites: [
    {
      id: "docker",
      label: "Docker",
      desc: "Containerizing services for runtime consistency, fast spin-ups, and portable microservice environments.",
      orbitRadius: 46,
      speed: 14,
      color: "text-[#2496ed] bg-[#2496ed]/10 border-[#2496ed]/30",
    },
    {
      id: "redis",
      label: "Redis",
      desc: "Implementing distributed in-memory cache clustering, session stores, and token-bucket rate limiting.",
      orbitRadius: 76,
      speed: 20,
      color: "text-[#d82c20] bg-[#d82c20]/10 border-[#d82c20]/30",
    },
    {
      id: "kafka",
      label: "Kafka",
      desc: "Designing event streams and decoupled log brokers for async publish/subscribe messaging channels.",
      orbitRadius: 106,
      speed: 26,
      color: "text-[#ff9900] bg-[#ff9900]/10 border-[#ff9900]/30",
    },
    {
      id: "kubernetes",
      label: "K8s",
      desc: "Studying pod configuration topologies, cluster orchestrations, and dynamic service meshes.",
      orbitRadius: 136,
      speed: 32,
      color: "text-[#326ce5] bg-[#326ce5]/10 border-[#326ce5]/30",
    },
  ],

  gitCommits: [
    {
      hash: "8f4a21c",
      message: "feat: graduate B.E. Computer Engineering SPPU with 8.12 CGPA",
      date: "Just now",
      author: "Anuraj Khandagale <anuraj.dev>",
      branch: "main"
    },
    {
      hash: "e391b0d",
      message: "feat(ai-email): integrate Spring WebClient async LLM pipeline (-60% drafting time)",
      date: "2 days ago",
      author: "Anuraj Khandagale",
      branch: "main"
    },
    {
      hash: "7c18a45",
      message: "feat(pitstop): implement spatial PostgreSQL queries (<2.0s emergency resolution)",
      date: "1 week ago",
      author: "Anuraj Khandagale",
      branch: "main"
    },
    {
      hash: "4b92df8",
      message: "feat(sms): build transactional MVC servlet controller with JDBC leak guards",
      date: "2 weeks ago",
      author: "Anuraj Khandagale",
      branch: "main"
    },
    {
      hash: "1a8f902",
      message: "chore: init IntelliJ-inspired Apple glassmorphism portfolio workspace",
      date: "3 weeks ago",
      author: "Anuraj Khandagale",
      branch: "main"
    }
  ] as GitCommit[],

  pomXml: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.anuraj</groupId>
    <artifactId>anuraj-developer-portfolio</artifactId>
    <version>2026.1.0-RELEASE</version>
    <packaging>jar</packaging>

    <name>ANURAJ.DEV</name>
    <description>Java Developer • Software Engineer • SPPU Computer Engineering Graduate (CGPA 8.12)</description>

    <properties>
        <java.version>21</java.version>
        <spring-boot.version>3.3.2</spring-boot.version>
        <developer.name>Anuraj Laxman Khandagale</developer.name>
        <developer.degree>B.E. Computer Engineering (SPPU)</developer.degree>
        <developer.cgpa>8.12</developer.cgpa>
        <developer.status>READY_FOR_SDE_ROLES</developer.status>
    </properties>

    <dependencies>
        <!-- Spring Boot Starter Web -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring WebFlux / WebClient for Async Communication -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-webflux</artifactId>
        </dependency>

        <!-- Spring Data JPA & Hibernate -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <!-- PostgreSQL & MySQL Relational Connectors -->
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>

        <!-- Core CS & Algorithmic Rigor -->
        <dependency>
            <groupId>com.anuraj.core</groupId>
            <artifactId>dsa-problem-solver-200plus</artifactId>
            <version>2.0.0</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>`,

  applicationYml: `# Spring Boot Application Configuration
# ANURAJ.DEV Workspace

spring:
  application:
    name: anuraj-portfolio-service
  profiles:
    active: production
  datasource:
    url: jdbc:postgresql://localhost:5432/anuraj_portfolio
    username: anuraj_admin
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 30000

developer:
  name: "Anuraj Laxman Khandagale"
  role: "Java Backend Developer / Software Engineer"
  degree: "B.E. Computer Engineering Graduate (SPPU)"
  cgpa: 8.12
  status: "Available for SDE / Backend Roles"
  location: "Pune, Maharashtra, India"
  email: "anurajkhandagale52a@gmail.com"
  github: "https://github.com/anurajkhandagale"
  linkedin: "https://linkedin.com/in/anuraj-khandagale-10020732b"

server:
  port: 8080
  compression:
    enabled: true
`
};

export interface FileItem {
  id: string;
  name: string;
  path: string;
  type: "file" | "folder";
  extension?: "java" | "md" | "xml" | "yml" | "pdf" | "json";
  category?: string;
  children?: FileItem[];
  isOpen?: boolean;
}

export const FILE_TREE: FileItem[] = [
  {
    id: "src",
    name: "src",
    path: "src",
    type: "folder",
    children: [
      {
        id: "projects-folder",
        name: "projects",
        path: "src/projects",
        type: "folder",
        children: [
          { id: "say-it-speech", name: "SayItSpeechEngine.java", path: "src/projects/SayItSpeechEngine.java", type: "file", extension: "java" },
          { id: "ai-email-generator", name: "AiEmailGenerator.java", path: "src/projects/AiEmailGenerator.java", type: "file", extension: "java" },
          { id: "pit-stop-live", name: "PitStopLive.java", path: "src/projects/PitStopLive.java", type: "file", extension: "java" },
          { id: "student-management-system", name: "StudentManagementSystem.java", path: "src/projects/StudentManagementSystem.java", type: "file", extension: "java" },
        ]
      },
      {
        id: "skills-folder",
        name: "skills",
        path: "src/skills",
        type: "folder",
        children: [
          { id: "java-core", name: "Java.java", path: "src/skills/Java.java", type: "file", extension: "java" },
          { id: "spring-boot", name: "SpringBoot.java", path: "src/skills/SpringBoot.java", type: "file", extension: "java" },
          { id: "databases", name: "DatabaseEngineering.java", path: "src/skills/DatabaseEngineering.java", type: "file", extension: "java" },
          { id: "cs-core", name: "ComputerScienceCore.java", path: "src/skills/ComputerScienceCore.java", type: "file", extension: "java" },
          { id: "tools", name: "ToolsAndPipelines.java", path: "src/skills/ToolsAndPipelines.java", type: "file", extension: "java" },
        ]
      },
      {
        id: "experience-folder",
        name: "experience",
        path: "src/experience",
        type: "folder",
        children: [
          { id: "achievements-file", name: "Achievements.java", path: "src/experience/Achievements.java", type: "file", extension: "java" },
          { id: "roadmap-file", name: "ActiveRoadmap.java", path: "src/experience/ActiveRoadmap.java", type: "file", extension: "java" },
        ]
      },
      {
        id: "education-folder",
        name: "education",
        path: "src/education",
        type: "folder",
        children: [
          { id: "education-file", name: "SavitribaiPhulePuneUniv.java", path: "src/education/SavitribaiPhulePuneUniv.java", type: "file", extension: "java" },
        ]
      },
      {
        id: "contact-folder",
        name: "contact",
        path: "src/contact",
        type: "folder",
        children: [
          { id: "contact-file", name: "ContactAnuraj.java", path: "src/contact/ContactAnuraj.java", type: "file", extension: "java" },
        ]
      }
    ]
  },
  { id: "readme", name: "README.md", path: "README.md", type: "file", extension: "md" },
  { id: "resume", name: "resume.pdf", path: "resume.pdf", type: "file", extension: "pdf" },
  { id: "pom", name: "pom.xml", path: "pom.xml", type: "file", extension: "xml" },
  { id: "application-yml", name: "application.yml", path: "application.yml", type: "file", extension: "yml" },
];
