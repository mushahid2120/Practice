
// import java.util.*;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;

public class PreDefinedFucInt {
    static int index = 0;

    public static void main(String[] args) {
        // Predicate boolean test(T t)
        Predicate<Integer> p = (Integer n) -> n % 2 == 0;
        System.out.print(p.test(44));

        // Function <R> apply (T t)
        Function<Integer, Double> f = (Integer n) -> Math.sqrt(n);
        System.out.println(f.apply(4));

        // Consumer void accept(T t)
        Consumer<String> c = (String name) -> {
            // System.out.println(name);
        };
        c.accept("Md Mushahid ansari");

        // forEach
        List<Integer> list = new ArrayList<>(List.of(4,1,3,5,6,7,84,3));

        list.forEach((Integer n) -> {
            list.set(index, Math::sqrt);
            index++;
        });
        System.out.println(list);
        list.forEach(System.out::println);
    }
}
