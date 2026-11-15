import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type QuizModel = runtime.Types.Result.DefaultSelection<Prisma.$QuizPayload>;
export type AggregateQuiz = {
    _count: QuizCountAggregateOutputType | null;
    _avg: QuizAvgAggregateOutputType | null;
    _sum: QuizSumAggregateOutputType | null;
    _min: QuizMinAggregateOutputType | null;
    _max: QuizMaxAggregateOutputType | null;
};
export type QuizAvgAggregateOutputType = {
    id: number | null;
    categoryId: number | null;
};
export type QuizSumAggregateOutputType = {
    id: number | null;
    categoryId: number | null;
};
export type QuizMinAggregateOutputType = {
    id: number | null;
    categoryId: number | null;
    title: string | null;
    difficulty: $Enums.Difficulty | null;
};
export type QuizMaxAggregateOutputType = {
    id: number | null;
    categoryId: number | null;
    title: string | null;
    difficulty: $Enums.Difficulty | null;
};
export type QuizCountAggregateOutputType = {
    id: number;
    categoryId: number;
    title: number;
    difficulty: number;
    _all: number;
};
export type QuizAvgAggregateInputType = {
    id?: true;
    categoryId?: true;
};
export type QuizSumAggregateInputType = {
    id?: true;
    categoryId?: true;
};
export type QuizMinAggregateInputType = {
    id?: true;
    categoryId?: true;
    title?: true;
    difficulty?: true;
};
export type QuizMaxAggregateInputType = {
    id?: true;
    categoryId?: true;
    title?: true;
    difficulty?: true;
};
export type QuizCountAggregateInputType = {
    id?: true;
    categoryId?: true;
    title?: true;
    difficulty?: true;
    _all?: true;
};
export type QuizAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuizWhereInput;
    orderBy?: Prisma.QuizOrderByWithRelationInput | Prisma.QuizOrderByWithRelationInput[];
    cursor?: Prisma.QuizWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | QuizCountAggregateInputType;
    _avg?: QuizAvgAggregateInputType;
    _sum?: QuizSumAggregateInputType;
    _min?: QuizMinAggregateInputType;
    _max?: QuizMaxAggregateInputType;
};
export type GetQuizAggregateType<T extends QuizAggregateArgs> = {
    [P in keyof T & keyof AggregateQuiz]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateQuiz[P]> : Prisma.GetScalarType<T[P], AggregateQuiz[P]>;
};
export type QuizGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuizWhereInput;
    orderBy?: Prisma.QuizOrderByWithAggregationInput | Prisma.QuizOrderByWithAggregationInput[];
    by: Prisma.QuizScalarFieldEnum[] | Prisma.QuizScalarFieldEnum;
    having?: Prisma.QuizScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: QuizCountAggregateInputType | true;
    _avg?: QuizAvgAggregateInputType;
    _sum?: QuizSumAggregateInputType;
    _min?: QuizMinAggregateInputType;
    _max?: QuizMaxAggregateInputType;
};
export type QuizGroupByOutputType = {
    id: number;
    categoryId: number;
    title: string;
    difficulty: $Enums.Difficulty;
    _count: QuizCountAggregateOutputType | null;
    _avg: QuizAvgAggregateOutputType | null;
    _sum: QuizSumAggregateOutputType | null;
    _min: QuizMinAggregateOutputType | null;
    _max: QuizMaxAggregateOutputType | null;
};
export type GetQuizGroupByPayload<T extends QuizGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<QuizGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof QuizGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], QuizGroupByOutputType[P]> : Prisma.GetScalarType<T[P], QuizGroupByOutputType[P]>;
}>>;
export type QuizWhereInput = {
    AND?: Prisma.QuizWhereInput | Prisma.QuizWhereInput[];
    OR?: Prisma.QuizWhereInput[];
    NOT?: Prisma.QuizWhereInput | Prisma.QuizWhereInput[];
    id?: Prisma.IntFilter<"Quiz"> | number;
    categoryId?: Prisma.IntFilter<"Quiz"> | number;
    title?: Prisma.StringFilter<"Quiz"> | string;
    difficulty?: Prisma.EnumDifficultyFilter<"Quiz"> | $Enums.Difficulty;
    category?: Prisma.XOR<Prisma.CategoryScalarRelationFilter, Prisma.CategoryWhereInput>;
    questions?: Prisma.QuizQuestionListRelationFilter;
    attempts?: Prisma.AttemptListRelationFilter;
};
export type QuizOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    difficulty?: Prisma.SortOrder;
    category?: Prisma.CategoryOrderByWithRelationInput;
    questions?: Prisma.QuizQuestionOrderByRelationAggregateInput;
    attempts?: Prisma.AttemptOrderByRelationAggregateInput;
};
export type QuizWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.QuizWhereInput | Prisma.QuizWhereInput[];
    OR?: Prisma.QuizWhereInput[];
    NOT?: Prisma.QuizWhereInput | Prisma.QuizWhereInput[];
    categoryId?: Prisma.IntFilter<"Quiz"> | number;
    title?: Prisma.StringFilter<"Quiz"> | string;
    difficulty?: Prisma.EnumDifficultyFilter<"Quiz"> | $Enums.Difficulty;
    category?: Prisma.XOR<Prisma.CategoryScalarRelationFilter, Prisma.CategoryWhereInput>;
    questions?: Prisma.QuizQuestionListRelationFilter;
    attempts?: Prisma.AttemptListRelationFilter;
}, "id">;
export type QuizOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    difficulty?: Prisma.SortOrder;
    _count?: Prisma.QuizCountOrderByAggregateInput;
    _avg?: Prisma.QuizAvgOrderByAggregateInput;
    _max?: Prisma.QuizMaxOrderByAggregateInput;
    _min?: Prisma.QuizMinOrderByAggregateInput;
    _sum?: Prisma.QuizSumOrderByAggregateInput;
};
export type QuizScalarWhereWithAggregatesInput = {
    AND?: Prisma.QuizScalarWhereWithAggregatesInput | Prisma.QuizScalarWhereWithAggregatesInput[];
    OR?: Prisma.QuizScalarWhereWithAggregatesInput[];
    NOT?: Prisma.QuizScalarWhereWithAggregatesInput | Prisma.QuizScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Quiz"> | number;
    categoryId?: Prisma.IntWithAggregatesFilter<"Quiz"> | number;
    title?: Prisma.StringWithAggregatesFilter<"Quiz"> | string;
    difficulty?: Prisma.EnumDifficultyWithAggregatesFilter<"Quiz"> | $Enums.Difficulty;
};
export type QuizCreateInput = {
    title: string;
    difficulty?: $Enums.Difficulty;
    category: Prisma.CategoryCreateNestedOneWithoutQuizzesInput;
    questions?: Prisma.QuizQuestionCreateNestedManyWithoutQuizInput;
    attempts?: Prisma.AttemptCreateNestedManyWithoutQuizInput;
};
export type QuizUncheckedCreateInput = {
    id?: number;
    categoryId: number;
    title: string;
    difficulty?: $Enums.Difficulty;
    questions?: Prisma.QuizQuestionUncheckedCreateNestedManyWithoutQuizInput;
    attempts?: Prisma.AttemptUncheckedCreateNestedManyWithoutQuizInput;
};
export type QuizUpdateInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    difficulty?: Prisma.EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty;
    category?: Prisma.CategoryUpdateOneRequiredWithoutQuizzesNestedInput;
    questions?: Prisma.QuizQuestionUpdateManyWithoutQuizNestedInput;
    attempts?: Prisma.AttemptUpdateManyWithoutQuizNestedInput;
};
export type QuizUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    categoryId?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    difficulty?: Prisma.EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty;
    questions?: Prisma.QuizQuestionUncheckedUpdateManyWithoutQuizNestedInput;
    attempts?: Prisma.AttemptUncheckedUpdateManyWithoutQuizNestedInput;
};
export type QuizCreateManyInput = {
    id?: number;
    categoryId: number;
    title: string;
    difficulty?: $Enums.Difficulty;
};
export type QuizUpdateManyMutationInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    difficulty?: Prisma.EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty;
};
export type QuizUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    categoryId?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    difficulty?: Prisma.EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty;
};
export type QuizCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    difficulty?: Prisma.SortOrder;
};
export type QuizAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
};
export type QuizMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    difficulty?: Prisma.SortOrder;
};
export type QuizMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    difficulty?: Prisma.SortOrder;
};
export type QuizSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
};
export type QuizListRelationFilter = {
    every?: Prisma.QuizWhereInput;
    some?: Prisma.QuizWhereInput;
    none?: Prisma.QuizWhereInput;
};
export type QuizOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type QuizScalarRelationFilter = {
    is?: Prisma.QuizWhereInput;
    isNot?: Prisma.QuizWhereInput;
};
export type EnumDifficultyFieldUpdateOperationsInput = {
    set?: $Enums.Difficulty;
};
export type QuizCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.QuizCreateWithoutCategoryInput, Prisma.QuizUncheckedCreateWithoutCategoryInput> | Prisma.QuizCreateWithoutCategoryInput[] | Prisma.QuizUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.QuizCreateOrConnectWithoutCategoryInput | Prisma.QuizCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.QuizCreateManyCategoryInputEnvelope;
    connect?: Prisma.QuizWhereUniqueInput | Prisma.QuizWhereUniqueInput[];
};
export type QuizUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.QuizCreateWithoutCategoryInput, Prisma.QuizUncheckedCreateWithoutCategoryInput> | Prisma.QuizCreateWithoutCategoryInput[] | Prisma.QuizUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.QuizCreateOrConnectWithoutCategoryInput | Prisma.QuizCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.QuizCreateManyCategoryInputEnvelope;
    connect?: Prisma.QuizWhereUniqueInput | Prisma.QuizWhereUniqueInput[];
};
export type QuizUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.QuizCreateWithoutCategoryInput, Prisma.QuizUncheckedCreateWithoutCategoryInput> | Prisma.QuizCreateWithoutCategoryInput[] | Prisma.QuizUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.QuizCreateOrConnectWithoutCategoryInput | Prisma.QuizCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.QuizUpsertWithWhereUniqueWithoutCategoryInput | Prisma.QuizUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.QuizCreateManyCategoryInputEnvelope;
    set?: Prisma.QuizWhereUniqueInput | Prisma.QuizWhereUniqueInput[];
    disconnect?: Prisma.QuizWhereUniqueInput | Prisma.QuizWhereUniqueInput[];
    delete?: Prisma.QuizWhereUniqueInput | Prisma.QuizWhereUniqueInput[];
    connect?: Prisma.QuizWhereUniqueInput | Prisma.QuizWhereUniqueInput[];
    update?: Prisma.QuizUpdateWithWhereUniqueWithoutCategoryInput | Prisma.QuizUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.QuizUpdateManyWithWhereWithoutCategoryInput | Prisma.QuizUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.QuizScalarWhereInput | Prisma.QuizScalarWhereInput[];
};
export type QuizUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.QuizCreateWithoutCategoryInput, Prisma.QuizUncheckedCreateWithoutCategoryInput> | Prisma.QuizCreateWithoutCategoryInput[] | Prisma.QuizUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.QuizCreateOrConnectWithoutCategoryInput | Prisma.QuizCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.QuizUpsertWithWhereUniqueWithoutCategoryInput | Prisma.QuizUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.QuizCreateManyCategoryInputEnvelope;
    set?: Prisma.QuizWhereUniqueInput | Prisma.QuizWhereUniqueInput[];
    disconnect?: Prisma.QuizWhereUniqueInput | Prisma.QuizWhereUniqueInput[];
    delete?: Prisma.QuizWhereUniqueInput | Prisma.QuizWhereUniqueInput[];
    connect?: Prisma.QuizWhereUniqueInput | Prisma.QuizWhereUniqueInput[];
    update?: Prisma.QuizUpdateWithWhereUniqueWithoutCategoryInput | Prisma.QuizUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.QuizUpdateManyWithWhereWithoutCategoryInput | Prisma.QuizUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.QuizScalarWhereInput | Prisma.QuizScalarWhereInput[];
};
export type QuizCreateNestedOneWithoutQuestionsInput = {
    create?: Prisma.XOR<Prisma.QuizCreateWithoutQuestionsInput, Prisma.QuizUncheckedCreateWithoutQuestionsInput>;
    connectOrCreate?: Prisma.QuizCreateOrConnectWithoutQuestionsInput;
    connect?: Prisma.QuizWhereUniqueInput;
};
export type QuizUpdateOneRequiredWithoutQuestionsNestedInput = {
    create?: Prisma.XOR<Prisma.QuizCreateWithoutQuestionsInput, Prisma.QuizUncheckedCreateWithoutQuestionsInput>;
    connectOrCreate?: Prisma.QuizCreateOrConnectWithoutQuestionsInput;
    upsert?: Prisma.QuizUpsertWithoutQuestionsInput;
    connect?: Prisma.QuizWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.QuizUpdateToOneWithWhereWithoutQuestionsInput, Prisma.QuizUpdateWithoutQuestionsInput>, Prisma.QuizUncheckedUpdateWithoutQuestionsInput>;
};
export type QuizCreateNestedOneWithoutAttemptsInput = {
    create?: Prisma.XOR<Prisma.QuizCreateWithoutAttemptsInput, Prisma.QuizUncheckedCreateWithoutAttemptsInput>;
    connectOrCreate?: Prisma.QuizCreateOrConnectWithoutAttemptsInput;
    connect?: Prisma.QuizWhereUniqueInput;
};
export type QuizUpdateOneRequiredWithoutAttemptsNestedInput = {
    create?: Prisma.XOR<Prisma.QuizCreateWithoutAttemptsInput, Prisma.QuizUncheckedCreateWithoutAttemptsInput>;
    connectOrCreate?: Prisma.QuizCreateOrConnectWithoutAttemptsInput;
    upsert?: Prisma.QuizUpsertWithoutAttemptsInput;
    connect?: Prisma.QuizWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.QuizUpdateToOneWithWhereWithoutAttemptsInput, Prisma.QuizUpdateWithoutAttemptsInput>, Prisma.QuizUncheckedUpdateWithoutAttemptsInput>;
};
export type QuizCreateWithoutCategoryInput = {
    title: string;
    difficulty?: $Enums.Difficulty;
    questions?: Prisma.QuizQuestionCreateNestedManyWithoutQuizInput;
    attempts?: Prisma.AttemptCreateNestedManyWithoutQuizInput;
};
export type QuizUncheckedCreateWithoutCategoryInput = {
    id?: number;
    title: string;
    difficulty?: $Enums.Difficulty;
    questions?: Prisma.QuizQuestionUncheckedCreateNestedManyWithoutQuizInput;
    attempts?: Prisma.AttemptUncheckedCreateNestedManyWithoutQuizInput;
};
export type QuizCreateOrConnectWithoutCategoryInput = {
    where: Prisma.QuizWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuizCreateWithoutCategoryInput, Prisma.QuizUncheckedCreateWithoutCategoryInput>;
};
export type QuizCreateManyCategoryInputEnvelope = {
    data: Prisma.QuizCreateManyCategoryInput | Prisma.QuizCreateManyCategoryInput[];
    skipDuplicates?: boolean;
};
export type QuizUpsertWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.QuizWhereUniqueInput;
    update: Prisma.XOR<Prisma.QuizUpdateWithoutCategoryInput, Prisma.QuizUncheckedUpdateWithoutCategoryInput>;
    create: Prisma.XOR<Prisma.QuizCreateWithoutCategoryInput, Prisma.QuizUncheckedCreateWithoutCategoryInput>;
};
export type QuizUpdateWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.QuizWhereUniqueInput;
    data: Prisma.XOR<Prisma.QuizUpdateWithoutCategoryInput, Prisma.QuizUncheckedUpdateWithoutCategoryInput>;
};
export type QuizUpdateManyWithWhereWithoutCategoryInput = {
    where: Prisma.QuizScalarWhereInput;
    data: Prisma.XOR<Prisma.QuizUpdateManyMutationInput, Prisma.QuizUncheckedUpdateManyWithoutCategoryInput>;
};
export type QuizScalarWhereInput = {
    AND?: Prisma.QuizScalarWhereInput | Prisma.QuizScalarWhereInput[];
    OR?: Prisma.QuizScalarWhereInput[];
    NOT?: Prisma.QuizScalarWhereInput | Prisma.QuizScalarWhereInput[];
    id?: Prisma.IntFilter<"Quiz"> | number;
    categoryId?: Prisma.IntFilter<"Quiz"> | number;
    title?: Prisma.StringFilter<"Quiz"> | string;
    difficulty?: Prisma.EnumDifficultyFilter<"Quiz"> | $Enums.Difficulty;
};
export type QuizCreateWithoutQuestionsInput = {
    title: string;
    difficulty?: $Enums.Difficulty;
    category: Prisma.CategoryCreateNestedOneWithoutQuizzesInput;
    attempts?: Prisma.AttemptCreateNestedManyWithoutQuizInput;
};
export type QuizUncheckedCreateWithoutQuestionsInput = {
    id?: number;
    categoryId: number;
    title: string;
    difficulty?: $Enums.Difficulty;
    attempts?: Prisma.AttemptUncheckedCreateNestedManyWithoutQuizInput;
};
export type QuizCreateOrConnectWithoutQuestionsInput = {
    where: Prisma.QuizWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuizCreateWithoutQuestionsInput, Prisma.QuizUncheckedCreateWithoutQuestionsInput>;
};
export type QuizUpsertWithoutQuestionsInput = {
    update: Prisma.XOR<Prisma.QuizUpdateWithoutQuestionsInput, Prisma.QuizUncheckedUpdateWithoutQuestionsInput>;
    create: Prisma.XOR<Prisma.QuizCreateWithoutQuestionsInput, Prisma.QuizUncheckedCreateWithoutQuestionsInput>;
    where?: Prisma.QuizWhereInput;
};
export type QuizUpdateToOneWithWhereWithoutQuestionsInput = {
    where?: Prisma.QuizWhereInput;
    data: Prisma.XOR<Prisma.QuizUpdateWithoutQuestionsInput, Prisma.QuizUncheckedUpdateWithoutQuestionsInput>;
};
export type QuizUpdateWithoutQuestionsInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    difficulty?: Prisma.EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty;
    category?: Prisma.CategoryUpdateOneRequiredWithoutQuizzesNestedInput;
    attempts?: Prisma.AttemptUpdateManyWithoutQuizNestedInput;
};
export type QuizUncheckedUpdateWithoutQuestionsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    categoryId?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    difficulty?: Prisma.EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty;
    attempts?: Prisma.AttemptUncheckedUpdateManyWithoutQuizNestedInput;
};
export type QuizCreateWithoutAttemptsInput = {
    title: string;
    difficulty?: $Enums.Difficulty;
    category: Prisma.CategoryCreateNestedOneWithoutQuizzesInput;
    questions?: Prisma.QuizQuestionCreateNestedManyWithoutQuizInput;
};
export type QuizUncheckedCreateWithoutAttemptsInput = {
    id?: number;
    categoryId: number;
    title: string;
    difficulty?: $Enums.Difficulty;
    questions?: Prisma.QuizQuestionUncheckedCreateNestedManyWithoutQuizInput;
};
export type QuizCreateOrConnectWithoutAttemptsInput = {
    where: Prisma.QuizWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuizCreateWithoutAttemptsInput, Prisma.QuizUncheckedCreateWithoutAttemptsInput>;
};
export type QuizUpsertWithoutAttemptsInput = {
    update: Prisma.XOR<Prisma.QuizUpdateWithoutAttemptsInput, Prisma.QuizUncheckedUpdateWithoutAttemptsInput>;
    create: Prisma.XOR<Prisma.QuizCreateWithoutAttemptsInput, Prisma.QuizUncheckedCreateWithoutAttemptsInput>;
    where?: Prisma.QuizWhereInput;
};
export type QuizUpdateToOneWithWhereWithoutAttemptsInput = {
    where?: Prisma.QuizWhereInput;
    data: Prisma.XOR<Prisma.QuizUpdateWithoutAttemptsInput, Prisma.QuizUncheckedUpdateWithoutAttemptsInput>;
};
export type QuizUpdateWithoutAttemptsInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    difficulty?: Prisma.EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty;
    category?: Prisma.CategoryUpdateOneRequiredWithoutQuizzesNestedInput;
    questions?: Prisma.QuizQuestionUpdateManyWithoutQuizNestedInput;
};
export type QuizUncheckedUpdateWithoutAttemptsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    categoryId?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    difficulty?: Prisma.EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty;
    questions?: Prisma.QuizQuestionUncheckedUpdateManyWithoutQuizNestedInput;
};
export type QuizCreateManyCategoryInput = {
    id?: number;
    title: string;
    difficulty?: $Enums.Difficulty;
};
export type QuizUpdateWithoutCategoryInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    difficulty?: Prisma.EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty;
    questions?: Prisma.QuizQuestionUpdateManyWithoutQuizNestedInput;
    attempts?: Prisma.AttemptUpdateManyWithoutQuizNestedInput;
};
export type QuizUncheckedUpdateWithoutCategoryInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    difficulty?: Prisma.EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty;
    questions?: Prisma.QuizQuestionUncheckedUpdateManyWithoutQuizNestedInput;
    attempts?: Prisma.AttemptUncheckedUpdateManyWithoutQuizNestedInput;
};
export type QuizUncheckedUpdateManyWithoutCategoryInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    difficulty?: Prisma.EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty;
};
export type QuizCountOutputType = {
    questions: number;
    attempts: number;
};
export type QuizCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    questions?: boolean | QuizCountOutputTypeCountQuestionsArgs;
    attempts?: boolean | QuizCountOutputTypeCountAttemptsArgs;
};
export type QuizCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuizCountOutputTypeSelect<ExtArgs> | null;
};
export type QuizCountOutputTypeCountQuestionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuizQuestionWhereInput;
};
export type QuizCountOutputTypeCountAttemptsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AttemptWhereInput;
};
export type QuizSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    categoryId?: boolean;
    title?: boolean;
    difficulty?: boolean;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
    questions?: boolean | Prisma.Quiz$questionsArgs<ExtArgs>;
    attempts?: boolean | Prisma.Quiz$attemptsArgs<ExtArgs>;
    _count?: boolean | Prisma.QuizCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["quiz"]>;
export type QuizSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    categoryId?: boolean;
    title?: boolean;
    difficulty?: boolean;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["quiz"]>;
export type QuizSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    categoryId?: boolean;
    title?: boolean;
    difficulty?: boolean;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["quiz"]>;
export type QuizSelectScalar = {
    id?: boolean;
    categoryId?: boolean;
    title?: boolean;
    difficulty?: boolean;
};
export type QuizOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "categoryId" | "title" | "difficulty", ExtArgs["result"]["quiz"]>;
export type QuizInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
    questions?: boolean | Prisma.Quiz$questionsArgs<ExtArgs>;
    attempts?: boolean | Prisma.Quiz$attemptsArgs<ExtArgs>;
    _count?: boolean | Prisma.QuizCountOutputTypeDefaultArgs<ExtArgs>;
};
export type QuizIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
};
export type QuizIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
};
export type $QuizPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Quiz";
    objects: {
        category: Prisma.$CategoryPayload<ExtArgs>;
        questions: Prisma.$QuizQuestionPayload<ExtArgs>[];
        attempts: Prisma.$AttemptPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        categoryId: number;
        title: string;
        difficulty: $Enums.Difficulty;
    }, ExtArgs["result"]["quiz"]>;
    composites: {};
};
export type QuizGetPayload<S extends boolean | null | undefined | QuizDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$QuizPayload, S>;
export type QuizCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<QuizFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: QuizCountAggregateInputType | true;
};
export interface QuizDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Quiz'];
        meta: {
            name: 'Quiz';
        };
    };
    findUnique<T extends QuizFindUniqueArgs>(args: Prisma.SelectSubset<T, QuizFindUniqueArgs<ExtArgs>>): Prisma.Prisma__QuizClient<runtime.Types.Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends QuizFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, QuizFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__QuizClient<runtime.Types.Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends QuizFindFirstArgs>(args?: Prisma.SelectSubset<T, QuizFindFirstArgs<ExtArgs>>): Prisma.Prisma__QuizClient<runtime.Types.Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends QuizFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, QuizFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__QuizClient<runtime.Types.Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends QuizFindManyArgs>(args?: Prisma.SelectSubset<T, QuizFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends QuizCreateArgs>(args: Prisma.SelectSubset<T, QuizCreateArgs<ExtArgs>>): Prisma.Prisma__QuizClient<runtime.Types.Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends QuizCreateManyArgs>(args?: Prisma.SelectSubset<T, QuizCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends QuizCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, QuizCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends QuizDeleteArgs>(args: Prisma.SelectSubset<T, QuizDeleteArgs<ExtArgs>>): Prisma.Prisma__QuizClient<runtime.Types.Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends QuizUpdateArgs>(args: Prisma.SelectSubset<T, QuizUpdateArgs<ExtArgs>>): Prisma.Prisma__QuizClient<runtime.Types.Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends QuizDeleteManyArgs>(args?: Prisma.SelectSubset<T, QuizDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends QuizUpdateManyArgs>(args: Prisma.SelectSubset<T, QuizUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends QuizUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, QuizUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends QuizUpsertArgs>(args: Prisma.SelectSubset<T, QuizUpsertArgs<ExtArgs>>): Prisma.Prisma__QuizClient<runtime.Types.Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends QuizCountArgs>(args?: Prisma.Subset<T, QuizCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], QuizCountAggregateOutputType> : number>;
    aggregate<T extends QuizAggregateArgs>(args: Prisma.Subset<T, QuizAggregateArgs>): Prisma.PrismaPromise<GetQuizAggregateType<T>>;
    groupBy<T extends QuizGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: QuizGroupByArgs['orderBy'];
    } : {
        orderBy?: QuizGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, QuizGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuizGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: QuizFieldRefs;
}
export interface Prisma__QuizClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    category<T extends Prisma.CategoryDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CategoryDefaultArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    questions<T extends Prisma.Quiz$questionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Quiz$questionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    attempts<T extends Prisma.Quiz$attemptsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Quiz$attemptsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface QuizFieldRefs {
    readonly id: Prisma.FieldRef<"Quiz", 'Int'>;
    readonly categoryId: Prisma.FieldRef<"Quiz", 'Int'>;
    readonly title: Prisma.FieldRef<"Quiz", 'String'>;
    readonly difficulty: Prisma.FieldRef<"Quiz", 'Difficulty'>;
}
export type QuizFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuizSelect<ExtArgs> | null;
    omit?: Prisma.QuizOmit<ExtArgs> | null;
    include?: Prisma.QuizInclude<ExtArgs> | null;
    where: Prisma.QuizWhereUniqueInput;
};
export type QuizFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuizSelect<ExtArgs> | null;
    omit?: Prisma.QuizOmit<ExtArgs> | null;
    include?: Prisma.QuizInclude<ExtArgs> | null;
    where: Prisma.QuizWhereUniqueInput;
};
export type QuizFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuizSelect<ExtArgs> | null;
    omit?: Prisma.QuizOmit<ExtArgs> | null;
    include?: Prisma.QuizInclude<ExtArgs> | null;
    where?: Prisma.QuizWhereInput;
    orderBy?: Prisma.QuizOrderByWithRelationInput | Prisma.QuizOrderByWithRelationInput[];
    cursor?: Prisma.QuizWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuizScalarFieldEnum | Prisma.QuizScalarFieldEnum[];
};
export type QuizFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuizSelect<ExtArgs> | null;
    omit?: Prisma.QuizOmit<ExtArgs> | null;
    include?: Prisma.QuizInclude<ExtArgs> | null;
    where?: Prisma.QuizWhereInput;
    orderBy?: Prisma.QuizOrderByWithRelationInput | Prisma.QuizOrderByWithRelationInput[];
    cursor?: Prisma.QuizWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuizScalarFieldEnum | Prisma.QuizScalarFieldEnum[];
};
export type QuizFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuizSelect<ExtArgs> | null;
    omit?: Prisma.QuizOmit<ExtArgs> | null;
    include?: Prisma.QuizInclude<ExtArgs> | null;
    where?: Prisma.QuizWhereInput;
    orderBy?: Prisma.QuizOrderByWithRelationInput | Prisma.QuizOrderByWithRelationInput[];
    cursor?: Prisma.QuizWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuizScalarFieldEnum | Prisma.QuizScalarFieldEnum[];
};
export type QuizCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuizSelect<ExtArgs> | null;
    omit?: Prisma.QuizOmit<ExtArgs> | null;
    include?: Prisma.QuizInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuizCreateInput, Prisma.QuizUncheckedCreateInput>;
};
export type QuizCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.QuizCreateManyInput | Prisma.QuizCreateManyInput[];
    skipDuplicates?: boolean;
};
export type QuizCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuizSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QuizOmit<ExtArgs> | null;
    data: Prisma.QuizCreateManyInput | Prisma.QuizCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.QuizIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type QuizUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuizSelect<ExtArgs> | null;
    omit?: Prisma.QuizOmit<ExtArgs> | null;
    include?: Prisma.QuizInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuizUpdateInput, Prisma.QuizUncheckedUpdateInput>;
    where: Prisma.QuizWhereUniqueInput;
};
export type QuizUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.QuizUpdateManyMutationInput, Prisma.QuizUncheckedUpdateManyInput>;
    where?: Prisma.QuizWhereInput;
    limit?: number;
};
export type QuizUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuizSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QuizOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuizUpdateManyMutationInput, Prisma.QuizUncheckedUpdateManyInput>;
    where?: Prisma.QuizWhereInput;
    limit?: number;
    include?: Prisma.QuizIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type QuizUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuizSelect<ExtArgs> | null;
    omit?: Prisma.QuizOmit<ExtArgs> | null;
    include?: Prisma.QuizInclude<ExtArgs> | null;
    where: Prisma.QuizWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuizCreateInput, Prisma.QuizUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.QuizUpdateInput, Prisma.QuizUncheckedUpdateInput>;
};
export type QuizDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuizSelect<ExtArgs> | null;
    omit?: Prisma.QuizOmit<ExtArgs> | null;
    include?: Prisma.QuizInclude<ExtArgs> | null;
    where: Prisma.QuizWhereUniqueInput;
};
export type QuizDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuizWhereInput;
    limit?: number;
};
export type Quiz$questionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuizQuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuizQuestionOmit<ExtArgs> | null;
    include?: Prisma.QuizQuestionInclude<ExtArgs> | null;
    where?: Prisma.QuizQuestionWhereInput;
    orderBy?: Prisma.QuizQuestionOrderByWithRelationInput | Prisma.QuizQuestionOrderByWithRelationInput[];
    cursor?: Prisma.QuizQuestionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuizQuestionScalarFieldEnum | Prisma.QuizQuestionScalarFieldEnum[];
};
export type Quiz$attemptsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptSelect<ExtArgs> | null;
    omit?: Prisma.AttemptOmit<ExtArgs> | null;
    include?: Prisma.AttemptInclude<ExtArgs> | null;
    where?: Prisma.AttemptWhereInput;
    orderBy?: Prisma.AttemptOrderByWithRelationInput | Prisma.AttemptOrderByWithRelationInput[];
    cursor?: Prisma.AttemptWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AttemptScalarFieldEnum | Prisma.AttemptScalarFieldEnum[];
};
export type QuizDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuizSelect<ExtArgs> | null;
    omit?: Prisma.QuizOmit<ExtArgs> | null;
    include?: Prisma.QuizInclude<ExtArgs> | null;
};
