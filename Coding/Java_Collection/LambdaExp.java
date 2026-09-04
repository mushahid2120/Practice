import java.util.*;

public class LambdaExp {
    interface Greeting {
        void greet();
    }

    public static void main(String[] args) {
        // Greeting gr = () -> {
        // System.out.println("hellow");
        // };
        // gr.greet();
        List<Student> studentList = new ArrayList<>(
        List.of((new Student("Md", 32)), (new Student("Ansari", 31)), (new Student("kk", 97))));

        List<Integer> mylist = new ArrayList<>(List.of(4, 2, 6, 9, 8, 86, 78, 84));
        Collections.sort(studentList, (s1, s2) -> s1.age - s2.age);
        for(Student s:studentList){
            System.out.println(s.getter());
        }
    }

}

class Student {
    String name;
    int age;

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getter() {
        return this.name + "=" + this.age;
    }
}

class MyComparator implements Comparator<Student> {
    @Override
    public int compare(Student o1, Student o2) {
        return o2.age - o1.age;
    }
}
