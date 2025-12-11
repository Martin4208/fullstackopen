const Course = ({ courses }) => {
    return (
        <div>
            {courses.map(course => {
                const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);
                
                return (
                    <div key={course.id}>
                        <h1>{course.name}</h1>
                        {course.parts.map(part => 
                            <p key={part.id}>
                                {part.name} {part.exercises}
                            </p>
                        )}
                        <b>total of {total} exercises</b>
                    </div>
                );
            }
                
            )}
        </div>
    );
}

export default Course; 