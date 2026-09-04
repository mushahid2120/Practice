import java.util.*;

public class ComparableInterface {
    public static void main(String args[]){

        List<Integer> list=new ArrayList<>(List.of(3,23,53,6,3,2,7,74));
        List<Student> studentList=new ArrayList<>(List.of((new Student("Md",32)),(new Student("Ansari",31)),(new Student("kk",97))));

        Collections.sort(studentList);
        for(Student s: studentList){
            System.out.println(s.getter());
        }
        Student maxStudent=Collections.max(studentList);
        System.out.println(maxStudent.getter());
    }
}

class Student implements Comparable<Student> {
    String name;
    int age;

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getter() {
        return this.name + "=" + this.age;
    }
    @Override
    public int compareTo(Student newStudent){
        // System.out.println(this.name.hashCode()-newStudent.hashCode());
        return this.age-newStudent.age;
    }
}
